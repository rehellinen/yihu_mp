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

  // 根据ID获取自营商家信息
  getShopByID(id, cb) {
    let params = {
      url: 'shop/' + id,
      callBack: function (data) {
        cb && cb(data)
      }
    }

    this.request(params)
  }

  // 根据ID获取二手卖家信息
  getSellerByID(id, cb) {

  }
}

export {ShopModel}