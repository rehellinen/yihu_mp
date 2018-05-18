import {GoodsModel} from '../../model/GoodsModel'
import {CartModel} from '../../model/CartModel'
import {Image} from "../../utils/image"

let goods = new GoodsModel()
let cart = new CartModel()

Page({
    data: {
        // picker中显示的数量
        selectedCount: 1,
        // 右上角购物车中商品的数量
        cartSelectedCount: 0,
        // picker显示的数组
        countArray: [],
        // 用于判断是否快速点击
        isTap: false,
        // 是否隐藏加载中动画
        loadingHidden: false,
        // 1为一手，2为二手
        type: 1
    },

    onLoad: function (options) {
        this.data.id = options.id
        this.data.type = options.type
        this.image = new Image(this)
        this.image.setLoadingHidden()

        this._loadData()
    },

    _loadData() {
        this.image.addPhotosCount(1)
        let url = 'oldGoods/' + this.data.id
        let type = 'seller'
        if (this.data.type == 1) {
            url = 'newGoods/' + this.data.id
            type = 'shop'
        }

        goods.getGoodsDetail(url, (res) => {
            for (let i = 1; i <= res.quantity; i++) {
                this.data.countArray.push(i)
            }
            this.setData({
                product: res,
                cartSelectedCount: cart.getCartTotalCount(),
                shop: res[type],
                countArray: this.data.countArray
            })
            wx.stopPullDownRefresh()
        })
    },

    // picker改变时触发的函数
    pickerChange(event) {
        let index = event.detail.value
        this.setData({
            selectedCount: this.data.countArray[index]
        })
    },

    addCartTap(event) {
        // 防止快速点击
        if (this.data.isTap) {
            return 0
        }
        // 处理加入购物车的数据逻辑
        let flag = this._addCartStorage()

        // 处理加入购物车的动画
        if (flag) {
            this._addCartAnimation(event)
        }
    },

    _addCartAnimation(event) {
        let touches = event.touches[0]
        let relative = {
            x: '25px',
            y: 15 - touches.clientY + 'px'
        }
        let style = 'display: block;transform:translate(' + relative.x + ',' + relative.y + ') rotate(350deg) scale(0)'
        this.setData({
            isTap: true,
            translateStyle: style
        })

        let that = this
        setTimeout(() => {
            this.setData({
                isTap: false,
                translateStyle: 'transform: none',
                isShake: true
            })

            setTimeout(() => {
                this.setData({
                    cartSelectedCount: cart.getCartTotalCount()
                })
                that.setData({
                    isShake: false
                })
            }, 200)
        }, 1000)
    },

    _addCartStorage() {
        // 是否成功添加商品
        let flag = true
        let tempObj = {}
        let keys = ['id', 'name', 'image_id', 'price', 'type', 'quantity']
        for (let key in this.data.product) {
            if (keys.indexOf(key) >= 0) {
                tempObj[key] = this.data.product[key]
            }
        }
        cart.add(tempObj, this.data.selectedCount, () => {
            wx.showToast({
                title: '商品库存不足',
                image: '/images/icon/pay@error.png'
            })
            flag = false
        })
        return flag
    },

    toCartTap() {
        wx.switchTab({
            url: '../cart/cart',
        })
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    },

    // 下拉刷新
    onPullDownRefresh() {
        this._loadData()
    },

    // 分享
    onShareAppMessage(res) {
        return {
            title: this.data.product.name,
            path: '/pages/detail/detail?id=' + this.data.product.id
            + '&type=' + this.data.product.type,
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