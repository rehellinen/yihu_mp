import { ThemeModel } from './theme-model.js'
let theme = new ThemeModel()

Page({
  data: {
    categoryIndex: 0
  },

  onLoad: function (options) {
    let id = options.id
    theme.getCategory(id, (res) => {
      this.setData({
        category: res,
        categoryID: res[0].id
      })

      theme.getGoodsByCategoryID(res[0].id, (data) => {
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

    theme.getGoodsByCategoryID(id, (res) => {
      this.setData({
        goods: res
      })
    })

    this.setData({
      categoryID: id,
      categoryIndex: index
    })
  }
})