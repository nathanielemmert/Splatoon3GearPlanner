import './app.css'
import App from './App.svelte'

export const VERSION:string = "400";

const app = new App({
  target: document.getElementById('app'),
})

export default app
