import type { Location } from '@/types/location'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTableSortableHeader from '@/components/shared/DataTableSortableHeader.vue'
import { formatDate } from '@/lib/date'
import { h } from 'vue'
import LocationActionDropdown from './LocationActionDropdown.vue'

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: 'id',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Location>, { column, title: 'ID' }),
  },
  {
    accessorKey: 'name',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Location>, { column, title: 'Name' }),
  },
  {
    accessorKey: 'rfidTag',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Location>, { column, title: 'RFID Tag' }),
  },
  {
    accessorKey: 'createdAt',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Location>, { column, title: 'Created At' }),
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: 'updatedAt',
    enableSorting: false,
    header: ({ column }) => h(DataTableSortableHeader<Location>, { column, title: 'Updated At' }),
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    accessorKey: 'actions',
    enableSorting: false,
    header: '',
    cell: ({ row }) => h(LocationActionDropdown, { location: row.original }),
  },
]
