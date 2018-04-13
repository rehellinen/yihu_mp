import { ThemeModel } from './theme-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let theme = new ThemeModel()

Page({
  data: {
    categoryIndex: 0,
    className: '',
    goods: [],
    hasMore: true,
    page: 1, 
    singleGoods: []
  },

  onLoad: function (options) {
    let id = options.id
    theme.getCategory(id, (res) => {
      this.setData({
        category: res,
        categoryID: res[0].id,
        categoryImage: res[0].image_id.image_url
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
      this.data.singleGoods.push.apply(this.data.singleGoods, data)
      this.setData({
        singleGoods: this.data.singleGoods
      })
    }, () => {
      this.data.hasMore = false
    })
  },

  selectCategory(event){
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    if (index == this.data.categoryIndex){
      return 0
    }
    this.setData({
      categoryID: id,
      categoryIndex: index,
      className: 'animateOut'
    })

    setTimeout( () => {      
      if(!this.data.goods[id]) {
        detail.getGoodsByCategoryID(this.data.page, id, (res) => {
          this.data.goods[id] = res
          this.setData({
            categoryImage: this.data.category[index].image_id.image_url,
            singleGoods: this.data.goods[id]
          })         
        }, (res) => {
          this.data.hasMore = false
        })
      }else{
        this.setData({
          categoryImage: this.data.category[index].image_id.image_url,
          singleGoods: this.data.goods[id]
        })         
      }      

      setTimeout( () => {
        this.setData({
          className: 'animateIn'
        })
      }, 150)

    }, 190) 
  },

  toDetail(event) {
    let id = event.currentTarget.dataset.id
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id + '&type=' + type,
    })
  }
})