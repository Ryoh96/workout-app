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
          Date: 'Date',
        },
      },
    },
    'src/graphql/generated/operations-type.ts': {
      schema: ['src/graphql/schema/**/*.graphql'],
      documents: 'src/graphql/schema/**/*.graphql',
      plugins: ['typescript', 'typescript-operations'],
      config: {
        enumsAsConst: true,
      },
    },
    'src/graphql/generated/operations.ts': {
      schema: ['src/graphql/schema/**/*.graphql'],
      documents: 'src/graphql/schema/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
      config: {
        fetcher: 'graphql-request',
        isReactHook: true,
        exposeQueryKeys: true,
      },
    },
  },
  hooks: {
    beforeDone: [
      `find ./src/graphql/generated -name "*.ts" -exec sed -i '' '/graphql-request\\/dist\\/types\\.dom/d' {} \\;`,
    ],
  },
}

export default codegenConfig
