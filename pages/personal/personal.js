import {UserModel} from "../../model/UserModel"
import {OrderModel} from '../../model/OrderModel.js'
import {Image} from "../../utils/image"
import {ElectricityModel} from "../../model/ElectricityModel"

let order = new OrderModel()
let electricity = new ElectricityModel()
let user = new UserModel()

Page({
    data: {
        loadingHidden: false,
        order: []
    },

    onLoad: function (options) {
        this.image = new Image(this)
        this.image.setLoadingHidden()

        this._loadData()
    },

    onShow() {
        let res = order.isHasNewOrder()
        if (res) {
            this.reload()
            order.setNewOrderStorage(false)
        }
    },

    _loadData(){
        // 获取用户信息
        user.getUserInfo((res) => {
            this.setData({
                avatar: res.avatarUrl,
                name: res.nickName
            })
        })

        // 关于电费
        electricity.getThreeDays( (res) => {
            this.setData({
                threeDays: res.elec
            })
        })

        electricity.getSurplus( (res) => {
            this.setData({
                surplus: res.elec
            })
        })

        // 关于订单
        let res = order.isHasNewOrder()
        if (!res) {
            this._loadOrder()
        }
    },

    // 加载订单数据
    _loadOrder() {
        order.getOrder(0, 1, (res) => {
            if (res.length >= 2) {
                this.image.addPhotosCount(4)
                this.data.order.push(res[0])
                this.data.order.push(res[1])
            } else if (res.length = 1) {
                this.image.addPhotosCount(3)
                this.data.order.push(res[0])
            }
            this.setData({
                order: this.data.order
            })
        }, (res) => {
            this.image.addPhotosCount(2)
            this.setData({
                order: this.data.order
            })
        })
        wx.stopPullDownRefresh()
    },

    toEdit(event) {
        wx.navigateTo({
            url: '../edit-info/edit-info?from=personal',
        })
    },

    toOrderMore(event) {
        wx.navigateTo({
            url: '../order-more/order-more',
        })
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    },

    reload() {
        this.data.order = []
        this._loadOrder()
    },

    onPullDownRefresh() {
        this.reload()
    }
})