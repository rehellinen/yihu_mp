import {Base} from '../../utils/base.js'

class ShopModel extends Base{
  constructor(){
    super()
  }

  // 获取自营商家信息
  getShop(cb){
    let params = {
      url: 'shop',
      callBack(data){
        cb && cb(data.data)
      }
    }
    this.request(params)
  }
}

export {ShopModel}