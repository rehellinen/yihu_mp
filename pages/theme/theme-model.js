import {Base} from '../../utils/base.js'

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

  getGoodsByCategoryID(id, cb){
    let params = {
      url: 'oldGoods/category/' + id,
      callBack(res) {
        cb && cb(res.data)
      }
    }
    this.request(params)
  }
}

export { ThemeModel }