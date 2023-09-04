import type { Part, PrismaPromise } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { partsFixture } from '../fixture/part'
import { prisma } from '.'

export const parts = () => {
  const parts: PrismaPromise<Part>[] = []
  partsFixture.forEach((name) => {
    const part = prisma.part.create({
      data: {
        id: uuid(),
        name,
      },
    })
    parts.push(part)
  })
  return parts
}
