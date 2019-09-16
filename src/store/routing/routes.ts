import { put } from 'redux-saga/effects'

import { UserActions } from '../users'

export const routes = [
  { path: '/', route: homeRoute },
  { path: '/users', route: userListRoute },
  { path: '/users/:id', route: userRoute },
]

function* homeRoute(params, queries) {}

function* userListRoute(params, queries) {
  yield put(UserActions.fetchUserList())
}

function* userRoute(params, queries) {
  const { id } = params
  yield put(UserActions.selectUser(parseInt(id)))
}
