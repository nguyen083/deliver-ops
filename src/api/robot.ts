import type { Paging } from '@/types/paging'
import type { Robot } from '@/types/robot'
import http from '@/lib/http'

export interface ListRobotParams {
  page?: number
  pageSize?: number
}

export interface CreateRobotParams {
  name: string
}

const robotApi = {
  listRobots: (params: ListRobotParams): Promise<Paging<Robot>> => {
    return http.get('/robots', { params })
  },
  getRobot: (id: number): Promise<Robot> => {
    return http.get(`/robots/${id}`)
  },
  createRobot: (params: CreateRobotParams): Promise<Robot> => {
    return http.post('/robots', params)
  },
  deleteRobot: (id: number): Promise<void> => {
    return http.delete(`/robots/${id}`)
  },
}

export default robotApi
