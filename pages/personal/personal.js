import { PersonalModel } from './personal-model.js'
let personal = new PersonalModel

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
  },

  toEdit(event){
    wx.navigateTo({
      url: '../edit-info/edit-info?from=personal',
    })
  }
})