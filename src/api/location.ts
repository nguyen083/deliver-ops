import type { Location } from '@/types/location'
import type { Paging } from '@/types/paging'
import http from '@/lib/http'

export interface ListLocationParams {
  page?: number
  pageSize?: number
}

export interface CreateLocationParams {
  name: string
  rfidTag: string
}

export interface UpdateLocationParams {
  name: string
  rfidTag: string
}

const locationApi = {
  listLocations: (params: ListLocationParams): Promise<Paging<Location>> => {
    return http.get('/locations', { params })
  },
  createLocation: (params: CreateLocationParams): Promise<Location> => {
    return http.post('/locations', params)
  },
  updateLocation: (params: { id: number, body: UpdateLocationParams }): Promise<Location> => {
    return http.put(`/locations/${params.id}`, params.body)
  },
  deleteLocation: (id: number): Promise<void> => {
    return http.delete(`/locations/${id}`)
  },
}

export default locationApi
