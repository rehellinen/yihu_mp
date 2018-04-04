import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
    page: 1,
    order: [],
    hasMore:true
  },

  onLoad: function (options) {
    this._loadOrder()
  },

  onReachBottom(){
    if(this.data.hasMore){
      this.data.page++
      this._loadOrder()
    }
  },

  _loadOrder(){
    order.getOrder(this.data.page, (res) => {
      this.data.order.push.apply(this.data.order, res)
      this.setData({
        order: this.data.order
      })
    }, (res) => {
      this.data.hasMore = false
    })
  }
})