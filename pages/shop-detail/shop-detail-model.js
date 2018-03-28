import {Base} from '../../utils/base.js'

class ShopDetailModel extends Base
{
  constructor(){
    super()
  }

  // 获取自营商家信息
  getShopInfo(id, cb){
    let params = {
      url: 'shop/' + id,
      callBack: function(data){
        cb && cb(data)
      }
    }

    this.request(params)
  }

  // 根据商家id获取所有商品
  getGoodsByShopId(id, cb){
    let params = {
      url: 'newGoods/shop/' + id,
      callBack: function (data) {
        cb && cb(data.data)
      }
    }

    this.request(params)
  }
  
  // 获取最近新品
  getRecentGoodsByShopId(id, cb) {
    let params = {
      url: 'newGoods/recent/shop/' + id,
      callBack: function (data) {
        cb && cb(data)
      }
    }

    this.request(params)
  }
}

export { ShopDetailModel }