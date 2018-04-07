import { ThemeModel } from './theme-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let theme = new ThemeModel()

Page({
  data: {
    categoryIndex: 0,
    className: ''
  },

  onLoad: function (options) {
    let id = options.id
    theme.getCategory(id, (res) => {
      this.setData({
        category: res,
        categoryID: res[0].id
      })

      detail.getGoodsByCategoryID(res[0].id, (data) => {
        this.setData({
          goods: data
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

    detail.getGoodsByCategoryID(id, (res) => {
      this.setData({
        goods: res,
        className: 'animateIn'
      })
    }) 
  }
})