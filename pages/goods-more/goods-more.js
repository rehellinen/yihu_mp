import {DetailModel} from '../detail/detail-model.js'
let detail = new DetailModel()

Page({
  data: {
    page: 1,
    hasMore: true,
    goods: []
  },

  onLoad: function (options) {
    this.data.type = options.type
    if (options.type == 1){
      this.setData({ title: "自 营 商 品" })
    }else{
      this.setData({ title: "二 手 旧 物" })
    }
    this._loadData()
  },

  onReachBottom(){
    if(this.data.hasMore){
      this.data.page++
      this._loadData()
    }
  },

  _loadData(){
    if (this.data.type == 1){
      this._loadGoods('newGoods')
    }else{
      this._loadGoods('oldGoods')
    }    
  },

  _loadGoods(url){
    detail.getGoods(url, this.data.page, (res) => {

      for (let index in res) {
        if (res[index].name.length > 8) {
          if (res[index].type == 1){
            res[index].name = res[index].name.substr(0, 10)
          }else{
            res[index].name = res[index].name.substr(0, 8)
          }          
          res[index].name += ' ...'
        }
      }

      this.data.goods.push.apply(this.data.goods, res)
      this.setData({
        goods: this.data.goods
      })
    }, (res) => {
      this.data.hasMore = false
    })
  }
})