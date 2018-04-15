import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()
let app = getApp()

Page({
  data: {    
    order: [
      [], [], [], [], []
    ],
    hasMore: [true, true, true, true, true],
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0,
    tabIndex: 0,
    page: [1, 1, 1, 1, 1]
  },

  onLoad: function (options) {
    this._loadOrder()
    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },

  onShow() {
    if (wx.getStorageSync('newOrder')) {
      this._loadOrder(true)
      wx.setStorageSync('newOrder', false)
    }
  },

  onReachBottom() {
    let index = this.data.tabIndex
    if (this.data.hasMore[index]) {
      this.data.page[index]++
      this._loadOrder()
    }
  },

  reload() {
    this.data.page[this.data.tabIndex] = 1 
    this._loadOrder(true)
  },

  _loadOrder(flag) {
    let index = this.data.tabIndex
    order.getOrder(index, this.data.page[index], (res) => {
      this.data.photoCount += res.length    
      if(flag){
        this.data.order[index] = res
      }else{
        this.data.order[index].push.apply(this.data.order[index], res)
      }      
      this.setData({
        order: this.data.order,
      })
    }, (res) => {
      this.data.hasMore[index] = false
      this.setData({
        loadingHidden: true
      })
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  switchTab(event){
    let index = event.detail.index
    this.data.tabIndex = index
    if(this.data.order[index].length == 0){
      this._loadOrder()
    }    
  }
})