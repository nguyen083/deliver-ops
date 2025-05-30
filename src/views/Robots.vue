<script setup lang="ts">
import type { Robot } from '@/types/robot'
import type { Table } from '@tanstack/vue-table'
import CreateRobotDialog from '@/components/app/robots/CreateRobotDialog.vue'
import { columns } from '@/components/app/robots/robots-table/columns'
import DataTable from '@/components/shared/DataTable.vue'
import DataTableColumnVisibility from '@/components/shared/DataTableColumnVisibility.vue'
import PageContainer from '@/components/shared/PageContainer.vue'
import { Button } from '@/components/ui/button'
import { useListRobotsQuery } from '@/composables/use-robot'
import { AlertCircle, Loader, RefreshCw } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const tableRef = useTemplateRef<{ table: Table<Robot> } | null>('table')

const page = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || 10)

const { data, isPending, isFetching, isError, error, refetch } = useListRobotsQuery(page, pageSize)

function handlePageChange(p: number) {
  page.value = p
  router.replace({ query: { ...route.query, page: p.toString() } })
}

function handlePageSizeChange(ps: number) {
  pageSize.value = ps
  page.value = 1
  router.replace({ query: { ...route.query, pageSize: ps.toString(), page: '1' } })
}
</script>

<template>
  <PageContainer>
    <div v-if="isPending" class="flex flex-col items-center justify-center gap-4 pt-20">
      <div class="flex items-center gap-4">
        <Loader class="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
      <p class="text-lg text-muted-foreground">
        Loading robots...
      </p>
    </div>

    <div v-else-if="isError" class="flex flex-col items-center justify-center gap-4 pt-20">
      <div class="flex flex-col items-center gap-4 p-6 text-destructive">
        <AlertCircle class="w-8 h-8" />
        <div class="space-y-2 text-center">
          <h2 class="text-lg font-semibold">
            Failed to load robots
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ error?.message || 'An unexpected error occurred' }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="!data" class="flex flex-col items-center justify-center gap-4 pt-20">
      <div class="flex flex-col items-center gap-4 p-6">
        <AlertCircle class="w-8 h-8 text-muted-foreground" />
        <div class="space-y-2 text-center">
          <h2 class="text-lg font-semibold">
            No robots found
          </h2>
          <p class="text-sm text-muted-foreground">
            There are no robots to display
          </p>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col w-full">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-semibold">
            Robots
          </h1>
          <p class="text-sm text-muted-foreground">
            View and manage your robots
          </p>
        </div>
        <div class="flex items-center gap-2">
          <CreateRobotDialog />
          <Button
            variant="outline"
            :disabled="isFetching"
            @click="() => refetch()"
          >
            <RefreshCw
              class="w-4 h-4 mr-2"
              :class="{ 'animate-spin': isFetching }"
            />
            Refresh
          </Button>
          <DataTableColumnVisibility
            v-if="tableRef?.table"
            :table="tableRef.table"
          />
        </div>
      </div>

      <DataTable
        ref="table"
        :page="page"
        :page-size="pageSize"
        :columns="columns"
        :data="data.items"
        :total-items="data.totalItems"
        :is-loading="isPending"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </div>
  </PageContainer>
</template>
