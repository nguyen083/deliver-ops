import robotApi from '@/api/robot'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export function useListRobotsQuery(page: Ref<number>, pageSize: Ref<number>) {
  return useQuery({
    queryKey: ['robots', page, pageSize],
    queryFn: () => robotApi.listRobots({ page: page.value, pageSize: pageSize.value }),
    placeholderData: keepPreviousData,
  })
}

export function useCreateRobotMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: robotApi.createRobot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robots'] })
    },
  })
}

export function useDeleteRobotMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: robotApi.deleteRobot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robots'] })
    },
  })
}
