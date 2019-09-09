import { lazy } from 'react'

const Example = lazy(() => import('./modules/__example__/example.container'))

export const routes = [
  { path: '/', component: Example, exact: true },
]

export const navRoutes = [
  { path: '/', name: 'Example' },
]
