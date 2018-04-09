import { ThemeModel } from './theme-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let theme = new ThemeModel()

Page({
  data: {
    categoryIndex: 0,
    className: '',
    goods: []
  },

  onLoad: function (options) {
    let id = options.id
    theme.getCategory(id, (res) => {
      let category_id = res[0].id
      this.setData({
        category: res,
        categoryID: category_id,
        categoryImage: res[0].image_id.image_url
      })

      detail.getGoodsByCategoryID(category_id, (data) => {
        this.setData({
          singleGoods: data
        })
      })
    })    
  },

  selectCategory(event){
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    if (index == this.data.categoryIndex){
      return 0;
    }
    this.setData({
      categoryID: id,
      categoryIndex: index,
      className: 'animateOut'
    })

    setTimeout( () => {      
      if(!this.data.goods[id]) {
        detail.getGoodsByCategoryID(id, (res) => {
          this.data.goods[id] = res
          this.setData({
            categoryImage: this.data.category[index].image_id.image_url,
            singleGoods: this.data.goods[id]
          })         
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