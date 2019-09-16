import { LitElement, customElement, html, css } from 'lit-element'
import './app-router'

@customElement('app-shell')
export class AppShellElement extends LitElement {
  render() {
    return html`
      <a href="/">home</a>
      <a href="/users">users</a>
      <a href="/users/1">1</a>
      <a href="/users/2">2</a>
      <a href="/users/3">3</a>
      <app-router></app-router>
    `
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      app-router {
        display: block;
      }
    `
  }
}
