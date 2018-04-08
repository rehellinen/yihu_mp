import { ShopModel } from '../shop/shop-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let shop = new ShopModel()

Page({  
  data: {
  
  },

  onLoad: function (options) {
    let id = options.id
    shop.getShopByID(id, (data) => {
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