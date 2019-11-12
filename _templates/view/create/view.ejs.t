---
to: src/ui/<%= tag %>.ts
---
<%
  className = h.changeCase.pascal(tag) + 'Element'
-%>
import { LitElement, customElement, html, property, css } from 'lit-element'
import { connect } from '@captaincodeman/redux-connect-element'
import { store, RootState, User, UserSelectors } from '../store'

@customElement('<%= tag %>')
export class <%= className %> extends connect(
  store,
  LitElement
) {
  @property({ type: Object })
  user: User

  mapState(state: RootState) {
    return {
      user: UserSelectors.user(state),
    }
  }

  render() {
    const u = this.user

    return html`
      <div>Hello ${u.name} and greetings from &lt;<%= tag %>&gt;!</div>
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
