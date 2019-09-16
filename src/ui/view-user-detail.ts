import { LitElement, customElement, html, property, css } from 'lit-element'
import { connect } from '@captaincodeman/redux-connect-element'
import { store, RootState, User, UserSelectors } from '../store'
import 'ts-wc-tutorial'

@customElement('view-user-detail')
export class UserDetailElement extends connect(
  store,
  LitElement
) {
  @property({ type: Object }) user: User

  mapState(state: RootState) {
    return {
      user: UserSelectors.user(state),
    }
  }

  clicked(e: Event) {
    this.user
  }

  render() {
    const u = this.user

    return html`
      <my-component .key=${u.id} .name=${u.name}></my-component>
    `
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `
  }
}
