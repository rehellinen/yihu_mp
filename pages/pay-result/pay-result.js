// pages/pay-result/pay-result.js
Page({
  data: {
  
  },

  onLoad: function (options) {
    this.setData({
      payResult: options.flag,
      id: options.id,
      from: options.from
    })
  }
})