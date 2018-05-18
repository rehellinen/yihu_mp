import { OrderModel } from '../../model/OrderModel.js'
let order = new OrderModel()
let app = getApp()

Page({
  data: {
    order: [
      [], [], [], [], []
    ],
    hasMore: [true, true, true, true, true],
    page: [1, 1, 1, 1, 1],
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0,
    tabIndex: 0,
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
      this.reload()
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

  reload(cb) {
    this.data.order = [
      [], [], [], [], []
    ]
    this.data.hasMore = [true, true, true, true, true]
    this.data.page = [1, 1, 1, 1, 1]
    this._loadOrder(cb)
  },

  _loadOrder(cb) {
    let index = this.data.tabIndex
    order.getOrder(index, this.data.page[index], (res) => {
      this.data.photoCount += res.length
      this.data.order[index].push.apply(this.data.order[index], res)
      this.setData({
        order: this.data.order,
      })
    }, (res) => {
      this.data.hasMore[index] = false
      this.setData({
        order: this.data.order,
        loadingHidden: true
      })
    })
    cb && cb()
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  switchTab(event) {
    let index = event.detail.index
    this.data.tabIndex = index
    if (this.data.order[index].length == 0) {
      this._loadOrder()
    }
  },

  onPullDownRefresh() {
    this.reload(() => {
      wx.stopPullDownRefresh()
    })
  }
})