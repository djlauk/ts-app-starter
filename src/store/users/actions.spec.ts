import { describe, it } from 'mocha'
import { expect } from 'chai'

import { UserActions, UserTypes } from './actions'
import { User } from './model'

const EXAMPLE_USER: User = {
  id: 42,
  name: 'john doe',
  username: 'jdoe',
  email: 'john.doe@example.org',
  address: {
    street: 'Some street',
    suite: '1A',
    city: 'Springfield',
    zipcode: '12345',
    geo: {
      lat: 10,
      lng: 20,
    },
  },
  phone: '555 1234',
  website: 'http://www.example.org/',
  company: {
    name: 'Example org',
    catchPhrase: 'All the examples you need',
    bs: 'blah',
  },
}

describe('user actions', () => {
  it('should create USER_SELECT', () => {
    const action = UserActions.selectUser(5)
    expect(action).to.deep.equal({
      type: UserTypes.USER_SELECT,
      payload: {
        id: 5,
      },
    })
  })

  it('should create USER_LIST_FETCH', () => {
    const action = UserActions.fetchUserList()
    expect(action).to.deep.equal({
      type: UserTypes.USER_LIST_FETCH,
    })
  })

  it('should create USER_LIST_FETCH_REQUEST', () => {
    const action = UserActions.fetchUserListRequest()
    expect(action).to.deep.equal({
      type: UserTypes.USER_LIST_FETCH_REQUEST,
    })
  })

  it('should create USER_LIST_FETCH_SUCCESS', () => {
    const users: User[] = [EXAMPLE_USER]
    const action = UserActions.fetchUserListSuccess(users)
    expect(action).to.deep.equal({
      type: UserTypes.USER_LIST_FETCH_SUCCESS,
      payload: {
        users,
      },
    })
  })

  it('should create USER_LIST_FETCH_FAILURE', () => {
    const action = UserActions.fetchUserListFailure(new Error('example error'))
    expect(action).to.have.property('type', UserTypes.USER_LIST_FETCH_FAILURE)
    expect(action)
      .to.have.nested.property('payload.error')
      .to.be.an('error')
      .and.have.property('message', 'example error')
  })

  it('should create USER_FETCH', () => {
    const action = UserActions.fetchUser(12)
    expect(action).to.deep.equal({
      type: UserTypes.USER_FETCH,
      payload: {
        id: 12,
      },
    })
  })

  it('should create USER_FETCH_REQUEST', () => {
    const action = UserActions.fetchUserRequest(13)
    expect(action).to.deep.equal({
      type: UserTypes.USER_FETCH_REQUEST,
      payload: {
        id: 13,
      },
    })
  })

  it('should create USER_FETCH_SUCCESS', () => {
    const action = UserActions.fetchUserSuccess(EXAMPLE_USER)
    expect(action).to.deep.equal({
      type: UserTypes.USER_FETCH_SUCCESS,
      payload: {
        user: EXAMPLE_USER,
      },
    })
  })

  it('should create USER_FETCH_FAILURE', () => {
    const action = UserActions.fetchUserFailure(14, new Error('example error'))
    expect(action).to.have.property('type', UserTypes.USER_FETCH_FAILURE)
    expect(action).to.have.nested.property('payload.id', 14)
    expect(action)
      .to.have.nested.property('payload.error')
      .to.be.an('error')
      .and.have.property('message', 'example error')
  })
})
