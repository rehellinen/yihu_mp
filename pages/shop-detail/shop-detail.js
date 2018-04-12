import { ShopModel } from '../shop/shop-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let shop = new ShopModel()
let app = getApp()

Page({  
  data: {
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0,
    hasMore: true,
    page: 1,
    goods: []
  },

  onLoad: function (options) {
    this.data.id = options.id
    shop.getShopByID(this.data.id, (data) => {
      this.setData({
        shop: data        
      })
    })
    
    this._loadGoods()

    detail.getRecentGoodsByShopId(this.data.id, (data) => {
      this.setData({
        recentGoods: data
      })
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  onReachBottom(){
    if (this.data.hasMore){
      this.data.page++
      this._loadGoods()      
    }
  },

  _loadGoods(){
    detail.getGoodsByShopId(this.data.page, this.data.id, (data) => {
      this.data.photoCount += (data.length + 2)
      this.data.goods.push.apply(this.data.goods, data)
      this.setData({
        goods: this.data.goods       
      })
    }, (data) => {
      this.data.hasMore = false
    })
  }
})