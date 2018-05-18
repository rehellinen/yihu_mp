import {Index} from '../../model/index-model'
import {GoodsModel} from '../../model/GoodsModel.js'
import {Image} from '../../utils/image.js'

let goods = new GoodsModel()
let index = new Index()

Page({
    data: {
        loadingHidden: false,
    },

    onLoad: function (options) {
        this.image = new Image(this)
        this.image.setLoadingHidden()

        this._loadData()
    },

    _loadData: function () {
        // 获取Banner
        index.getBanners((data) => {
            this.image.addPhotosCount(data.length + 16)
            this.setData({
                banner: data
            })
        })

        // 获取主题
        index.getTheme((data) => {
            this.setData({
                theme: data,
            })
        })

        // 获取发现鲜货
        goods.getIndexNewGoods((data) => {
            for (let index in data) {
                if (data[index].name.length > 10) {
                    data[index].name = data[index].name.substr(0, 10)
                    data[index].name += ' ...'
                }
            }
            this.setData({
                newGoods: data
            })
        })

        // 旧物漂流
        goods.getIndexOldGoods((data) => {
            for (let index in data) {
                if (data[index].name.length > 8) {
                    data[index].name = data[index].name.substr(0, 8)
                    data[index].name += ' ...'
                }
            }
            this.setData({
                oldGoods: data
            })
        })

        wx.stopPullDownRefresh()
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    },

    toTheme(event) {
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '../theme/theme?id=' + id,
        })
    },

    toSearch(event) {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },

    toGoodsMore(event) {
        let type = event.currentTarget.dataset.type
        wx.navigateTo({
            url: '/pages/goods-more/goods-more?type=' + type,
        })
    },

    // 下拉刷新
    onPullDownRefresh() {
        this._loadData()
    },

    // 分享
    onShareAppMessage(res) {
        return {
            title: '校园易乎',
            path: '/pages/index/index',
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
})