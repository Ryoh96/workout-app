import type { Page } from '@playwright/test'
import { format } from 'date-fns'

export const url = (path: string, port = 3000) =>
  `http://localhost:${port}${path}`
