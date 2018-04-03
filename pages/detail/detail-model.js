import { Base } from '../../utils/base.js';

class DetailModel extends Base{
  constructor() {
    super()
  }

  getGoodsDetail(id, cb){
    let params = {
      url: 'newGoods/' + id,
      callBack: function (data) {
        cb && cb(data);
      }
    }
    this.request(params)
  }

  getOldGoodsDetail(id, cb) {
    let params = {
      url: 'oldGoods/' + id,
      callBack: function (data) {
        cb && cb(data);
      }
    }
    this.request(params)
  }

  // 根据商家id获取所有商品
  getGoodsByShopId(id, cb) {
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

  getGoodsByCategoryID(id, cb) {
    let params = {
      url: 'oldGoods/category/' + id,
      callBack(res) {
        cb && cb(res.data)
      }
    }
    this.request(params)
  }
}

export { DetailModel }
