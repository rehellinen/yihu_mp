import { ShopDetailModel } from './shop-detail-model.js'
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

    shop.getGoodsByShopId(id, (data) => {
      this.setData({
        goods: data
      })
    })

    shop.getRecentGoodsByShopId(id, (data) => {
      this.setData({
        recentGoods: data
      })
    })
  }
})