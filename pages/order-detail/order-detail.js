// pages/order-detail/order-detail.js
import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let id = options.id
    order.getOrderByID(id, (res) =>{
      this.setData({
        order: res
      })
    })
  }
})