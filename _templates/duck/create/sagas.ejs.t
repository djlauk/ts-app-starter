---
to: src/store/<%= duck %>/sagas.ts
---
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { <%= duckTypes %>, <%= duckActions %> } from './actions'
import * as <%= duckSelectors %> from './selectors'
import { <%= duckModel %> } from './model'

export default [select<%= duckModel %>Listener, fetch<%= duckModel %>ListListener, fetch<%= duckModel %>Listener]

function* select<%= duckModel %>Listener() {
  yield takeLatest(<%= duckTypes %>.<%= duckUpcase %>_SELECT, select<%= duckModel %>Saga)
}

function* select<%= duckModel %>Saga(action: ReturnType<typeof <%= duckActions %>.select<%= duckModel %>>) {
  const { id } = action.payload
  const shouldFetch = yield select(<%= duckSelectors %>.shouldFetch)
  if (shouldFetch) {
    yield put(<%= duckActions %>.fetch<%= duckModel %>(id))
  }
}

function* fetch<%= duckModel %>ListListener() {
  yield takeLatest(<%= duckTypes %>.<%= duckUpcase %>_LIST_FETCH, fetch<%= duckModel %>ListSaga)
}

function* fetch<%= duckModel %>ListSaga(
  action: ReturnType<typeof <%= duckActions %>.fetch<%= duckModel %>List>
) {
  yield put(<%= duckActions %>.fetch<%= duckModel %>ListRequest())
  try {
    const <%= duck %> = yield call(fetch<%= duckModel %>s)
    yield put(<%= duckActions %>.fetch<%= duckModel %>ListSuccess(<%= duck %>))
  } catch (err) {
    console.error(err)
    yield put(<%= duckActions %>.fetch<%= duckModel %>ListFailure(err))
  }
}

function* fetch<%= duckModel %>Listener() {
  yield takeLatest(<%= duckTypes %>.<%= duckUpcase %>_FETCH, fetch<%= duckModel %>Saga)
}

function* fetch<%= duckModel %>Saga(action: ReturnType<typeof <%= duckActions %>.fetch<%= duckModel %>>) {
  const { id } = action.payload

  yield put(<%= duckActions %>.fetch<%= duckModel %>Request(id))
  try {
    const <%= duckSingular %> = yield call(fetch<%= duckModel %>, id)
    yield put(<%= duckActions %>.fetch<%= duckModel %>Success(<%= duckSingular %>))
  } catch (err) {
    console.error(err)
    yield put(<%= duckActions %>.fetch<%= duckModel %>Failure(id, err))
  }
}

export async function fetch<%= duckModel %>s() {
  const url = `${window.MyApp.api}/<%= duck %>`
  const resp = await fetch(url)
  const json = await resp.json()
  return <<%= duckModel %>[]>json
}

export async function fetch<%= duckModel %>(id: number) {
  const url = `${window.MyApp.api}/<%= duck %>/${id}`
  const resp = await fetch(url)
  const json = await resp.json()
  return <<%= duckModel %>>json
}
