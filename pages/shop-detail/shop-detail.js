import { ShopDetailModel } from './shop-detail-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let shop = new ShopDetailModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let id = options.id
    shop.getShopInfo(id, (data) => {
      this.setData({
        shop: data
      })
    })

    detail.getGoodsByShopId(id, (data) => {
      this.setData({
        goods: data
      })
    })

    detail.getRecentGoodsByShopId(id, (data) => {
      this.setData({
        recentGoods: data
      })
    })
  }
})