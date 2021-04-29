export interface IStatus {
  general: 'OK' | 'DEGRADED' |  'DEAD',
  services: [
    {
      name: string,
      status: boolean
    }
  ]
}
