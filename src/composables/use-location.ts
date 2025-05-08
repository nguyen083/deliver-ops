import locationApi from '@/api/location'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export function useListLocationsQuery(page: Ref<number>, pageSize: Ref<number>) {
  return useQuery({
    queryKey: ['locations', page, pageSize],
    queryFn: () => locationApi.listLocations({ page: page.value, pageSize: pageSize.value }),
    placeholderData: keepPreviousData,
  })
}

export function useCreateLocationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: locationApi.createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })
}

export function useUpdateLocationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: locationApi.updateLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })
}

export function useDeleteLocationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: locationApi.deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })
}
