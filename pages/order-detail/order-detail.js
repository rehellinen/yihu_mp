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
  },

  pay(event){
    let id = this.data.order.id
    order.execPay(id, (res) => {
      if (res != 0) {
        let flag = res == 2
        wx.redirectTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag,
        })
      }
    }) 
  }
})