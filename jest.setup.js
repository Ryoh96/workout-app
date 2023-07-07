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

global.ResizeObserver = jest.fn(function (callback) {
  this.observe = jest.fn()
  this.unobserve = jest.fn()
  this.disconnect = jest.fn()
  this.trigger = (changes) => {
    callback(changes, this)
  }
})

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});