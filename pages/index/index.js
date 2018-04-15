import {Index} from 'index-model.js'
import {DetailModel} from '../detail/detail-model.js'
let detail = new DetailModel()
let index = new Index()
let app = getApp()


Page({  
  data: {
    banner : [],
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    this._loadData();
    setTimeout( () => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },  

  onShareAppMessage(res){
    return {
      title: '校园易乎',
      path: '/pages/index/index',
      success(res){
        wx.showToast({
          title: '分享成功',
          image: '/images/icon/pay@success.png'
        })
      },
      fail(res){
        wx.showToast({
          title: '分享失败',
          image: '/images/icon/pay@error.png'
        })
      }
    }
  },

  // 加载所有数据
  _loadData : function(callBack) {
    // 获取Banner
    index.getBanners( (data) => {
      this.data.photoCount += (data.length + 14)
      this.setData({
        banner : data
      })
    })

    // 获取主题
    index.getTheme( (data) => {
      this.setData({
        theme: data,
      })
    })

    // 旧物漂流
    detail.getIndexOldGoods( (data) => {
      for (let index in data) {
        if (data[index].name.length > 8) {
          data[index].name = data[index].name.substr(0, 8)
          data[index].name += ' ...'
        }        
      }
      this.setData({
        oldGoods: data
      })
    })

    // 获取发现鲜货
    detail.getIndexNewGoods((data) => {
      for (let index in data) {
        if (data[index].name.length > 10) {
          data[index].name = data[index].name.substr(0, 10)
          data[index].name += ' ...'
        }        
      }
      this.setData({
        newGoods: data
      })
    })    
  },

  toTheme(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../theme/theme?id=' + id,
    })
  },

  isLoadAll(event){ 
    let that = this
    app.isLoadAll(that)
  },

  toSearch(event){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  toGoodsMore(event){
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/goods-more/goods-more?type=' + type,
    })
  }
})