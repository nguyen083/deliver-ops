export type RobotStatus = 'ONLINE' | 'OFFLINE'

export interface Robot {
  id: number
  name: string
  status: RobotStatus
  token: string
  createdAt: string
  updatedAt: string
}
