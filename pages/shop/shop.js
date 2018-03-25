import { ShopModel } from './shop-model.js'
let shop = new ShopModel()
Page({
  data: {
  
  },

  onLoad: function (options) {
    shop.getShop( (data) => {
      this.setData({
        shop: data
      })
    })
  },

  toShopDetail(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop-detail/shop-detail?id=' + id,
    })
  }
})