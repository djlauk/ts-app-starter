import { LitElement, customElement, html, property, css } from 'lit-element'
import { connect } from '@captaincodeman/redux-connect-element'
import { store, RootState, User, UserSelectors, UserActions } from '../store'
import 'ts-wc-tutorial'

@customElement('view-user-list')
export class UserListElement extends connect(
  store,
  LitElement
) {
  @property({ type: Array }) users: User[]
  @property({ type: Number }) selected: number

  mapState(state: RootState) {
    return {
      users: UserSelectors.users(state),
      selected: UserSelectors.selected(state),
    }
  }

  mapEvents() {
    return {
      'my-component-click': (e: CustomEvent) =>
        UserActions.selectUser(e.detail.key),
      'my-component-updated': (e: CustomEvent) =>
        UserActions.updateUser(e.detail),
      'my-component-delete': (e: CustomEvent) =>
        UserActions.deleteUser(e.detail.key),
    }
  }

  render() {
    const userTemplate = (u: User) =>
      html`
        <my-component
          .key=${u.id}
          .name=${u.name}
          .selected=${u.id === this.selected}
        ></my-component>
      `

    return html`
      ${this.users.map(userTemplate)}
    `
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      my-component {
        margin: 8px;
      }
    `
  }
}
