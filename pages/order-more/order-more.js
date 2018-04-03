import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    order.getOrder((res) => {
      this.setData({
        order: res
      })
    })
  }
})