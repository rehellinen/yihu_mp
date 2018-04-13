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
  getGoodsByShopId(page, id, cb, ecb) {
    let params = {
      url: 'newGoods/shop/' + id,
      data: {
        page: page
      },
      callBack: function (data) {
        cb && cb(data.data)
      },
      eCallBack(data){
        ecb && ecb(data)
      }
    }

    this.request(params)
  }

  // 获取自营商店最近新品
  getRecentGoodsByShopId(id, cb) {
    let params = {
      url: 'newGoods/recent/shop/' + id,
      callBack: function (data) {
        cb && cb(data)
      }
    }

    this.request(params)
  }

  // 根据分类获取商品
  getGoodsByCategoryID(page, id, cb, ecb) {
    let params = {
      url: 'oldGoods/category/' + id,
      data:{
        page: page
      },
      callBack(res){
        cb && cb(res.data)
      },
      eCallBack(res){
        ecb && ecb(res)
      }
    }
    this.request(params)
  }

  // 获取首页旧物漂流
  getIndexOldGoods(cb){
    let params = {
      url: 'oldGoods/index',
      callBack(res) {
        cb && cb(res)
      },
    }
    this.request(params)
  }

  // 获取首页发现鲜货
  getIndexNewGoods(cb) {
    let params = {
      url: 'newGoods/index',
      callBack(res) {
        cb && cb(res)
      },
    }
    this.request(params)
  }
}

export { DetailModel }
