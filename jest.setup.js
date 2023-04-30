import '@testing-library/jest-dom'
import 'whatwg-fetch'

import React from 'react'
import { TextDecoder, TextEncoder } from 'text-encoding'

global.React = React

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))
// https://github.com/scottrippey/next-router-mock/issues/58
jest.mock('next/dist/shared/lib/router-context', () => {
  const { createContext } = require('react')
  const router = require('next-router-mock').default
  const RouterContext = createContext(router)
  return { RouterContext }
})

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}