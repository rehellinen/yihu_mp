import { EditInfoModel } from './edit-info-model.js'
let editInfo = new EditInfoModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    editInfo.getBuyerInfo( (res) => {
      this.setData({
        info: res
      })
    })
  },

  formSubmit(event){
    let formValue = event.detail.value
    editInfo.updateBuyerInfo(formValue, (res) => {
      if(res.status == 90000){
        this.showTip('', res.message)
      }else{
        this.showTip('成功', '更新个人信息成功', true)
      }
    })    
  },

  showTip(title, content, flag){
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(res){
        if(flag){
          wx.switchTab({
            url: '/pages/personal/personal',
          })
        }
      }
    })
  }
})