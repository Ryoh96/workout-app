import type { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  generates: {
    'src/graphql/generated/schema.graphql': {
      schema: ['src/graphql/schema/**/*.graphql'],
      plugins: ['schema-ast'],
    },
    'src/graphql/generated/resolvers-types.ts': {
      schema: ['src/graphql/schema/**/*.graphql'],
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
      config: {
        enumsAsConst: true,
        contextType: '@/graphql/context#Context',
        scalars: {
          DateTime: 'string',
        },
        mapperTypeSuffix: 'Model',
        mappers: {
          User: '@prisma/client#User',
          Exercise: '@prisma/client#Exercise',
          Part: '@prisma/client#Part',
          Round: '@prisma/client#Round',
          Note: '@prisma/client#Note',
          Training: '@prisma/client#Training',
          Memo: '@prisma/client#Memo',
          Unit: '@prisma/client#Unit',
        },
      },
    },
    'src/graphql/generated/operations-type.ts': {
      schema: ['src/graphql/schema/**/*.graphql'],
      documents: 'src/graphql/schema/**/*.graphql',
      plugins: ['typescript', 'typescript-operations'],
      config: {
        enumsAsConst: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
    'src/graphql/generated/operations-csr.ts': {
      schema: ['src/graphql/schema/**/*.graphql'],
      documents: 'src/graphql/schema/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
      config: {
        enumsAsConst: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
    'src/graphql/generated/operations-ssg.ts': {
      schema: ['src/graphql/schema/**/*.graphql'],
      documents: 'src/graphql/schema/**/*.graphql',
      plugins: [
        'typescript-graphql-request',
        'typescript',
        'typescript-operations',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
      config: {
        enumsAsConst: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
  hooks: {
    beforeDone: [
      `find ./src/graphql/generated -name "*.ts" -exec sed -i '' -e '/graphql-request\\/dist\\/types\\.dom/d' -e 's/Dom\\./''/g' {} \\;`,
    ],
  },
}

export default codegenConfig
