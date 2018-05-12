import { PersonalModel } from './personal-model.js'
import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()
let personal = new PersonalModel()
let app = getApp()

Page({
  data: {
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0,
    order: []
  },

  onLoad: function (options) {
    personal.getUserInfo( (res) => {         
      this.setData({
        avatar: res.avatarUrl,
        name: res.nickName
      })
    })
    let res = order.isHasNewOrder()
    if(!res){
      this._loadOrder()  
    }    
    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)  
  },

  onShow(){
    let res = order.isHasNewOrder()
    if(res){
      this.reload()
      order.setNewOrderStorage(false)
    }
  },

  // 加载订单数据
  _loadOrder(cb){
    order.getOrder(0, 1, (res) => {
      if(res.length >= 2){
        this.data.photoCount += 4       
        this.data.order.push(res[0])
        this.data.order.push(res[1])
      }else if(res.length = 1){
        this.data.photoCount += 3
        this.data.order.push(res[0])
      }
      this.setData({
        order: this.data.order
      })
    }, (res) => {
      this.data.photoCount += 2
      this.setData({
        order: this.data.order
      })
    })
    cb && cb()
  },

  toEdit(event){
    wx.navigateTo({
      url: '../edit-info/edit-info?from=personal',
    })
  },

  toOrderMore(event){
    wx.navigateTo({
      url: '../order-more/order-more',
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  reload(){
    this.data.order = []
    this._loadOrder()
  },

  onPullDownRefresh() {
    this.data.order = []
    this._loadOrder(() => {
      wx.stopPullDownRefresh()
    })
  }
})