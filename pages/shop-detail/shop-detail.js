import { ShopModel } from '../shop/shop-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let shop = new ShopModel()
let app = getApp()

Page({  
  data: {
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    let id = options.id
    shop.getShopByID(id, (data) => {
      this.setData({
        shop: data
      })
    })

    detail.getGoodsByShopId(id, (data) => {
      this.data.photoCount += (data.length + 2)
      this.setData({
        goods: data
      })
    })

    detail.getRecentGoodsByShopId(id, (data) => {
      this.setData({
        recentGoods: data
      })
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  }
})