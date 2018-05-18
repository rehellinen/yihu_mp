import {Base} from './base.js'

class ThemeModel extends Base
{
  constructor(){
    super()
  }

  getCategory(id, cb){
    let params = {
      url: 'category/' + id,
      callBack(res){
        cb && cb(res)
      }
    }
    this.request(params)
  }
}

export { ThemeModel }