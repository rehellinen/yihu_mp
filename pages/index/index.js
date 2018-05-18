import {Index} from 'index-model.js'
import {DetailModel} from '../detail/detail-model.js'
import {Image} from '../../utils/image.js'
let detail = new DetailModel()
let index = new Index()
let app = getApp()


Page({  
  data: {
    loadingHidden: false,
  },

  onLoad: function (options) {
    this.image = new Image(this)
    this.image.setLoadingHidden()

    this._loadData();
  },    

  _loadData : function() {
    let totalCount = 3 + 4 + 6 + 6
    this.image.addPhotosCount(totalCount)

    // 获取Banner
    index.getBanners( (data) => {      
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

      wx.stopPullDownRefresh()
    })       
  },

  isLoadedAll(event) {
    this.image.isLoadedAll()
  },

  toTheme(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../theme/theme?id=' + id,
    })
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
  },

  // 下拉刷新
  onPullDownRefresh(){
    this._loadData()
  },

  // 分享
  onShareAppMessage(res) {
    return {
      title: '校园易乎',
      path: '/pages/index/index',
      success(res) {
        wx.showToast({
          title: '分享成功',
          image: '/images/icon/share@success.png'
        })
      },
      fail(res) {
        wx.showToast({
          title: '分享失败',
          image: '/images/icon/share@error.png'
        })
      }
    }
  },
})