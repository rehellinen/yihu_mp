import { PersonalModel } from './personal-model.js'
import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()
let personal = new PersonalModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    personal.getUserInfo( (res) => {
      this.setData({
        avatar: res.avatarUrl,
        name: res.nickName
      })
    })
    this._loadOrder()    
  },

  onShow(){
    let res = order.isHasNewOrder()
    if(res){
      this._loadOrder()
      order.setNewOrderStorage(false)
    }
  },

  // 加载订单数据
  _loadOrder(){
    order.getOrder(1, (res) => {
      let data = []
      if(res.length >= 2){        
        data.push(res[0])
        data.push(res[1])
      }else if(res.length = 1){
        data.push(res[0])
      }
      
      this.setData({
        order: data
      })
    })
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
  }
})