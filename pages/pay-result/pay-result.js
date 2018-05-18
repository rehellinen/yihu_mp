// pages/pay-result/pay-result.js
Page({
    data: {},

    onLoad: function (options) {
        this.setData({
            payResult: options.flag,
        })
    },

    viewOrder(event) {
        wx.switchTab({
            url: '/pages/personal/personal',
        })
    }
})