import { EditInfoModel } from '../../model/edit-info-model.js'
let editInfo = new EditInfoModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    editInfo.getBuyerInfo( (res) => {
      this.setData({
        info: res,
      })
    })
  },

  formSubmit(event){
    let formValue = event.detail.value
    editInfo.updateBuyerInfo(formValue, (res) => {
      if(res.status == 90000){
        this.showTips('', res.message, false)
      }else{        
        this.showTips('成功', '更新个人信息成功', true)
      }
    })    
  },

  showTips(title, content, flag){
    let that = this
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(res){
        if(flag){
          wx.navigateBack({})   
        }             
      }
    })
  }
})