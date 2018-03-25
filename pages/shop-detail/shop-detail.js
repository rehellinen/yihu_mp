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
  }
})