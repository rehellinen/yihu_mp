import { ShopModel } from '../../model/ShopModel.js'
let shop = new ShopModel()
let app = getApp()

Page({
  data: {
    photoCount: 0,
    loadedPhoto: 0,
    page: 1,
    shop: [],
    hasMore: true
  },

  onLoad: function (options) {
    this._loadShop()
    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },

  onReachBottom(){
    if (this.data.hasMore) {
      this.data.page++
      this._loadShop()
    }    
  },

  _loadShop(cb){
    shop.getShop(this.data.page, (data) => {
      this.data.photoCount += data.length
      this.data.shop.push.apply(this.data.shop, data)
      this.setData({
        shop: this.data.shop
      })
    }, (data) => {
      this.data.hasMore = false
    })

    cb && cb()
  },

  toShopDetail(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop-detail/shop-detail?id=' + id,
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  onPullDownRefresh() {
    this.data.shop = []
    this.data.page = 1
    this.data.hasMore = true
    this._loadShop(() => {
      wx.stopPullDownRefresh()
    })
  }
})