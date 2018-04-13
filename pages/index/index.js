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
  },  

  // 加载所有数据
  _loadData : function(callBack) {
    // 获取Banner
    index.getBanners( (data) => {
      this.data.photoCount += data.length
      this.setData({
        banner : data
      })
    })

    // 旧物漂流
    detail.getIndexOldGoods( (data) => {
      this.data.photoCount += data.length
      for (let index in data) {
        if (data[index].name.length > 10) {
          data[index].name = data[index].name.substr(0, 10)
          data[index].name += ' ...'
        }

        this.setData({
          oldGoods: data
        })
      }
    })

    index.getTheme( (data) => {
      this.data.photoCount += data.length
      this.setData({
        theme: data,
      })
    })
  },

  detailTap(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&type=' + 2,
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
  }
})