import {Token} from './utils/token.js'

App({
  onLaunch(){
    let token = new Token()
    token.verify()
  }
})