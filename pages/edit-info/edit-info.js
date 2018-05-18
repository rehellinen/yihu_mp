import {UserModel} from '../../model/UserModel.js'

let user = new UserModel()

Page({
    data: {},

    onLoad: function (options) {
        user.getBuyerInfo((res) => {
            this.setData({
                info: res,
            })
        })
    },

    formSubmit(event) {
        let formValue = event.detail.value
        user.updateBuyerInfo(formValue, (res) => {
            if (res.status === 90000) {
                this.showTips('', res.message, false)
            } else {
                this.showTips('成功', '更新个人信息成功', true)
            }
        })
    },

    showTips(title, content, flag) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            success(res) {
                if (flag) {
                    wx.navigateBack({})
                }
            }
        })
    }
})