import { ThemeModel } from './theme-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let theme = new ThemeModel()

Page({
  data: {
    categoryIndex: 0,
    className: 'animation1',
    goods: [],
    hasMore: true,
    page: 1, 
    goods: []
  },

  onLoad: function (options) {
    let id = options.id
    theme.getCategory(id, (res) => {
      this.setData({
        category: res,
        categoryID: res[0].id,
      })      
      this._loadGoods()
    })    
    
  },

  onReachBottom(){
    if(this.data.hasMore){
      this.data.page++
      this._loadGoods()
    }
  },

  _loadGoods(){
    detail.getGoodsByCategoryID(this.data.page, this.data.categoryID, (data) => {
      this.data.goods[this.data.categoryID] = []
      this.data.goods[this.data.categoryID].push
          .apply(this.data.goods[this.data.categoryID], data)      
      
      this.setData({        
        goods: this.data.goods
      })
    }, () => {
      this.data.hasMore = false
    })
  },

  selectCategory(event){
    // 切换后的ID和Index
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    // 点击当前的选项卡不做操作
    if (index == this.data.categoryIndex) {
      return 0
    }
    this.data.page = 1    
    this.setData({
      className: 'animation' + (index + 1),
      categoryID: id,
      categoryIndex: index 
    })
    if (!this.data.goods[id]) {
      this._loadGoods()
    } 
  },

  toDetail(event) {
    let id = event.currentTarget.dataset.id
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id + '&type=' + type,
    })
  }
})