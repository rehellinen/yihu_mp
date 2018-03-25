// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
  },

  toShopDetail(event){
    wx.navigateTo({
      url: '/pages/shop-detail/shop-detail',
    })
  }
})