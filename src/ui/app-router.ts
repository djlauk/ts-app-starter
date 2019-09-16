import UniversalRouter from 'universal-router'
import {
  LitElement,
  customElement,
  html,
  property,
  css,
  PropertyValues,
} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import { connect } from '@captaincodeman/redux-connect-element'
import { store, RootState, RoutingSelectors } from '../store'

@customElement('app-router')
export class AppRouterElement extends connect(
  store,
  LitElement
) {
  @property({ type: String }) pathname: string
  @property({ type: String }) view: string

  mapState(state: RootState) {
    return {
      pathname: RoutingSelectors.pathname(state),
    }
  }

  constructor() {
    super()
    this.router = new UniversalRouter(this.routes)
  }

  private router: UniversalRouter

  private routes = [
    {
      path: '/',
      action: () => `<view-home></view-home>`,
    },
    {
      path: '/users',
      action: () => `<view-user-list></view-user-list>`,
    },
    {
      path: '/users/:id',
      action: () => `<view-user-detail></view-user-detail>`,
    },
  ]

  createRenderRoot() {
    return this
  }

  shouldUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('pathname')) {
      this.router
        .resolve(this.pathname)
        .then(html => (this.view = html))
        .catch(error => (this.view = `<view-error>${error}</view-error>`))
    }
    return changedProperties.has('view')
  }

  render() {
    return html`
      ${unsafeHTML(this.view)}
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
