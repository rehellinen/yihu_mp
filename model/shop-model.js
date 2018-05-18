import {Base} from './base.js'

class ShopModel extends Base{
  constructor(){
    super()
  }

  // 获取自营商家信息
  getShop(page, cb, ecb){
    let params = {
      url: 'shop',
      data: {
        page: page
      },
      callBack(data){
        cb && cb(data)
      },
      eCallBack(data){
        ecb && ecb(data)
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