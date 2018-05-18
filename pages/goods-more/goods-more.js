import {DetailModel} from '../../model/GoodsModel.js'
let detail = new DetailModel()
let app = getApp()

Page({
  data: {
    page: 1,
    hasMore: true,
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0,
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

  _loadData(cb){
    if (this.data.type == 1){
      this._loadGoods('newGoods', cb)
    }else{
      this._loadGoods('oldGoods', cb)
    }    
  },

  _loadGoods(url, cb){
    detail.getGoods(url, this.data.page, (res) => { 
      this.data.photoCount += (res.length)
      this.data.goods.push.apply(this.data.goods, res)
      this.setData({
        goods: this.data.goods
      })
    }, (res) => {
      this.data.hasMore = false
    })
    cb && cb()
  },

  // 处理商品名字太长换行的情况
  // res -> 商品结果集
  // count -> 截取多少位（按中文算）
  processString(res, count) {
    console.log(1)
    for (let index in res) {
      let length = 0
      for (let i = 0; i < res[index].name.length; i++) {
        if (res[index].name.charCodeAt(i) > 127) {
          length += 2;
        } else {
          length++;
        }
        if (length >= count * 2) {
          res[index].name = res[index].name.substr(0, i)
          res[index].name += ' ...'
        }
      }
    }
    return res
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  onPullDownRefresh() {
    this.data.page = 1,
    this.data.hasMore = true,
    this.data.goods = []
    this._loadData(() => {
      wx.stopPullDownRefresh()
    })
  }
})