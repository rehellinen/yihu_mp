import {OrderModel} from '../../model/OrderModel.js'
import {Image} from "../../utils/image"

let order = new OrderModel()

Page({
    data: {
        order: [
            [], [], [], [], []
        ],
        hasMore: [true, true, true, true, true],
        page: [1, 1, 1, 1, 1],
        loadingHidden: false,
        tabIndex: 0,
    },

    onLoad: function (options) {
        this.image = new Image(this)
        this.image.setLoadingHidden()
        this._loadOrder()
    },

    onShow() {
        if (wx.getStorageSync('newOrder')) {
            this.reload()
            wx.setStorageSync('newOrder', false)
        }
    },

    onReachBottom() {
        let index = this.data.tabIndex
        if (this.data.hasMore[index]) {
            this.data.page[index]++
            this._loadOrder()
        }
    },

    reload() {
        this.data.order = [
            [], [], [], [], []
        ]
        this.data.hasMore = [true, true, true, true, true]
        this.data.page = [1, 1, 1, 1, 1]
        this._loadOrder()
    },

    _loadOrder() {
        let index = this.data.tabIndex
        order.getOrder(index, this.data.page[index], (res) => {
            this.image.addPhotosCount(res.length)
            this.data.order[index].push.apply(this.data.order[index], res)
            this.setData({
                order: this.data.order,
            })
        }, (res) => {
            this.data.hasMore[index] = false
            this.setData({
                order: this.data.order,
                loadingHidden: true
            })
        })
        wx.stopPullDownRefresh()
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    },

    switchTab(event) {
        let index = event.detail.index
        this.data.tabIndex = index
        if (this.data.order[index].length == 0) {
            this._loadOrder()
        }
    },

    onPullDownRefresh() {
        this.reload()
    }
})