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
}

export { ShopDetailModel }