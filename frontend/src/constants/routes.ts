export const apiRoutes = {
  getClients: '/clients',
  getClient: '/clients/',
  updateClient: '/clients/',
  deleteClient: '/clients/',
  createClient: '/clients',
}

export const appRoutes = {
  main: '/',
  archive: '/archive',
}

export type IAppRoutesKeys = keyof typeof appRoutes
export type IAppRoutesValues = typeof appRoutes[IAppRoutesKeys]
