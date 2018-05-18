import {ShopModel} from '../../model/ShopModel.js'
import {Image} from "../../utils/image"

let shop = new ShopModel()

Page({
    data: {
        page: 1,
        shop: [],
        hasMore: true,
        loadingHidden: false
    },

    onLoad: function (options) {
        this.image = new Image(this)
        this.image.setLoadingHidden()

        this._loadShop()
    },

    onReachBottom() {
        if (this.data.hasMore) {
            this.data.page++
            this._loadShop()
        }
    },

    _loadShop(cb) {
        shop.getShop(this.data.page, (data) => {
            this.image.addPhotosCount(data.length)
            this.data.shop.push.apply(this.data.shop, data)
            this.setData({
                shop: this.data.shop
            })
        }, (data) => {
            this.data.hasMore = false
        })

        cb && cb()
    },

    toShopDetail(event) {
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/shop-detail/shop-detail?id=' + id,
        })
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    },

    onPullDownRefresh() {
        this.data.shop = []
        this.data.page = 1
        this.data.hasMore = true
        this._loadShop(() => {
            wx.stopPullDownRefresh()
        })
    }
})