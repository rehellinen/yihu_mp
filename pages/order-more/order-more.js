import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()
let app = getApp()

Page({
  data: {
    page: 1,
    order: [],
    unpaid: [],
    paid: [],
    delivered: [],
    completed: [],
    hasMore:true,
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    this._loadOrder()
  },

  onShow(){
    if(wx.getStorageSync('newOrder')){
      this._loadOrder()
      wx.setStorageSync('newOrder', false)
    }
  },

  onReachBottom(){
    if(this.data.hasMore){
      this.data.page++
      this._loadOrder()
    }
  },

  _loadOrder(){
    order.getOrder(this.data.page, (res) => {
      this.data.photoCount += res.length
      for(let i in res){        
        // 待付款
        if (res[i].status == 1){
          this.data.unpaid.push(res[i])
        }// 待发货
        else if (res[i].status == 2) {
          this.data.paid.push(res[i])
        }// 待收货
        else if (res[i].status == 3) {
          this.data.delivered.push(res[i])
        }// 已完成 
        else if (res[i].status == 5) {
          this.data.completed.push(res[i])
        }
      }
      this.data.order.push.apply(this.data.order, res)
      this.setData({
        order: this.data.order,
        unpaid: this.data.unpaid,
        paid: this.data.paid,
        delivered: this.data.delivered
      })
    }, (res) => {
      this.data.hasMore = false
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  }
})