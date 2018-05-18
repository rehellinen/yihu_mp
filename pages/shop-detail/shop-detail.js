import {ShopModel} from '../../model/ShopModel'
import {GoodsModel} from "../../model/GoodsModel"
import {UserModel} from '../../model/UserModel'
import {Image} from "../../utils/image"

let user = new UserModel()
let goods = new GoodsModel()
let shop = new ShopModel()

Page({
    data: {
        loadingHidden: false,
        hasMore: true,
        page: 1,
        goods: []
    },

    onLoad: function (options) {
        this.image = new Image(this)
        this.image.setLoadingHidden()

        this.data.id = options.id

        this._loadGoods()
    },

    onShareAppMessage(res) {
        return {
            title: this.data.shop.name,
            path: '/pages/shop-detail/shop-detail?id=' + this.data.shop.id,
            success(res) {
                wx.showToast({
                    title: '分享成功',
                    image: '/images/icon/share@success.png'
                })
            },
            fail(res) {
                wx.showToast({
                    title: '分享失败',
                    image: '/images/icon/share@error.png'
                })
            }
        }
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    },

    onReachBottom() {
        if (this.data.hasMore) {
            this.data.page++
            this._loadGoods()
        }
    },

    _loadGoods() {
        shop.getShopByID(this.data.id, (data) => {
            this.setData({
                shop: data
            })
        })

        goods.getGoodsByShopId(this.data.page, this.data.id, (data) => {
            this.image.addPhotosCount(data.length + 2)
            this.data.goods.push.apply(this.data.goods, data)
            this.setData({
                goods: this.data.goods
            })
        }, (data) => {
            this.image.addPhotosCount(2)
            this.data.hasMore = false
        })

        goods.getRecentGoodsByShopId(this.data.id, (data) => {
            this.setData({
                recentGoods: data
            })
        })
    }
})