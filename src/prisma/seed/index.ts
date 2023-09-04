import { PrismaClient } from '@prisma/client'

import { parts } from './part'

export const prisma = new PrismaClient()

const main = async () => {
  console.log('Seeding: start...')
  await prisma.$transaction([...parts()])
  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
