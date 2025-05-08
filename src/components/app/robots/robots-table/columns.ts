import type { Robot } from '@/types/robot'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTableSortableHeader from '@/components/shared/DataTableSortableHeader.vue'
import { formatDate } from '@/lib/date'
import { h } from 'vue'
import NameLink from './NameLink.vue'
import RobotActionsDropdown from './RobotActionsDropdown.vue'
import TokenCell from './TokenCell.vue'

export const columns: ColumnDef<Robot>[] = [
  {
    accessorKey: 'id',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Robot>, { column, title: 'ID' }),
  },
  {
    accessorKey: 'name',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Robot>, { column, title: 'Name' }),
    cell: ({ row }) => h(NameLink, { robotId: row.original.id, robotName: row.original.name }),
  },
  {
    accessorKey: 'status',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Robot>, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = row.original.status
      return h('span', {
        class: `px-2 py-1 rounded-full text-xs font-medium ${
          status === 'ONLINE'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`,
      }, status)
    },
  },
  {
    accessorKey: 'token',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Robot>, { column, title: 'Token' }),
    cell: ({ row }) => h(TokenCell, { token: row.original.token }),
  },
  {
    accessorKey: 'createdAt',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Robot>, { column, title: 'Created At' }),
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: 'updatedAt',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Robot>, { column, title: 'Updated At' }),
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    accessorKey: 'actions',
    enableSorting: false,
    header: '',
    cell: ({ row }) => h(RobotActionsDropdown, { robot: row.original }),
  },
]
