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

    order.getOrder((res) => {
      let data = []
      data.push(res[0])
      data.push(res[1])
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