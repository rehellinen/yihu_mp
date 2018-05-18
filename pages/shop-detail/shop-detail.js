import { ShopModel } from '../../model/shop-model.js'
import { DetailModel } from '../../model/GoodsModel.js'
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

    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },

  onShareAppMessage(res) {
    return {
      title: this.data.shop.name,
      path: '/pages/shop-detail/shop-detail?id=' + this.data.shop.id,
      success(res) {
        wx.showToast({
          title: '分享成功',
          image: '/images/icon/pay@success.png'
        })
      },
      fail(res) {
        wx.showToast({
          title: '分享失败',
          image: '/images/icon/pay@error.png'
        })
      }
    }
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
      this.data.photoCount += 2
      this.data.hasMore = false
    })
  }
})