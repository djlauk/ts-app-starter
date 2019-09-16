import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from 'redux'
import { RootState } from './reducer'

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
  }

  type RequestIdleCallbackHandle = any
  type RequestIdleCallbackOptions = {
    timeout: number
  }
  type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean
    timeRemaining: () => number
  }
}

const storageKey = `my-app`
const storageVersion = '20190731'
const shouldPersist = (type: string) => true // type.startsWith('CART_') || type.startsWith('ORDER_')

export const storageMiddleware: Middleware<Dispatch> = (
  store: MiddlewareAPI
) => next => (action: AnyAction) => {
  const result = next(action)
  const persist = shouldPersist(action.type)

  if (persist) {
    // TODO: key ref to callback, only schedule if not already done
    window.requestIdleCallback(() => {
      const state: RootState = store.getState()
      const cache = {
        version: storageVersion,
        timestamp: new Date(),
        state: {
          users: state.users,
        },
      }
      localStorage.setItem(storageKey, JSON.stringify(cache))
    })
  }

  return result
}

export const initialState = () => {
  const json = localStorage.getItem(storageKey)
  if (!json) return undefined

  const cache = JSON.parse(json)
  if (cache.version !== storageVersion) return undefined

  const age_ms = Date.now() - new Date(cache.timestamp).getTime()
  const age_days = age_ms / 1000 / 60 / 60 / 24
  if (age_days > 365) return undefined

  return <RootState>cache.state
}
