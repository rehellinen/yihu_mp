import {CartModel} from '../cart/cart-model.js'
let cart = new CartModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let goods = cart.getCartDataFromLocal(true)
    this.setData({
      totalPrice : options.totalPrice,
      goods: goods,
      orderStatus: 0
    })
  },

  editInfo(event){
    wx.navigateTo({
      url: '../edit-info/edit-info',
    })
  }
})