// pages/pay-result/pay-result.js
Page({
  data: {
  
  },

  onLoad: function (options) {
    this.setData({
      payResult: options.flag,
      id: options.id
    })
  },

  viewOrder(event){
    let id = event.currentTarget.dataset.id
    wx.redirectTo({
      url: '/pages/order-detail/order-detail?id=' + id,
    })
  }
})