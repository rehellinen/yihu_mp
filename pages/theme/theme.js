import { ThemeModel } from './theme-model.js'
import { DetailModel } from '../detail/detail-model.js'
let detail = new DetailModel()
let theme = new ThemeModel()
let app = getApp()

Page({
  data: {
    categoryIndex: 0,
    loadingHidden: false,
    className: 'animation1',
    goods: [],
    hasMore: true,
    page: 1, 
    goods: [],
    photoCount: 0,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    let id = options.id
    theme.getCategory(id, (res) => {
      for(let i in res){
        let id = res[i].id
        if (res[i].name.length > 3){
          res[i].fontClass = 'small'
        }else{
          res[i].fontClass = 'big'
        }
        this.data.goods[id] = []
      }
      this.setData({
        category: res,
        categoryID: res[0].id,
      })      
      this._loadGoods()
    })    
    
  },

  _loadGoods(){
    detail.getGoodsByCategoryID(this.data.page, this.data.categoryID, (data) => {  
      for(let i in data){
        if(data[i].name.length > 5){
          data[i].name = data[i].name.substr(0, 5)
          data[i].name += ' ...'
        }
      }

      this.data.photoCount += (data.length)    
      this.data.goods[this.data.categoryID].push.apply(this.data.goods[this.data.categoryID], data)      
      
      this.setData({        
        goods: this.data.goods
      })
    }, () => {
      this.data.hasMore = false
      this.setData({
        loadingHidden: true
      })
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

  toLoadMore(event){
    if(this.data.hasMore){
      this.data.page++
      this._loadGoods()
    } 
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },
})