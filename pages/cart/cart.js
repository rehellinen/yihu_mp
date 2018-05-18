import {CartModel} from '../../model/cart-model.js'
import {Image} from "../../utils/image"

let cart = new CartModel()

Page({
    data: {
        loadingHidden: false
    },

    onLoad() {
        this.image = new Image(this)
        this.image.setLoadingHidden()
    },

    onShow: function () {
        cart.updateGoods(() => {
            this.data.cartData = cart.getCartDataFromLocal()

            this.image.addPhotosCount(this.data.cartData.length)
            if (this.data.cartData.length === 0) {
                this.setData({
                    loadingHidden: true
                })
            }

            this._updateCartData()
        })
    },

    onHide() {
        cart.setCartStorage(this.data.cartData)
    },

    // 单选按钮
    selectTap(event) {
        let id = event.currentTarget.dataset.id
        let selected = event.currentTarget.dataset.selected
        let index = this._getIndexByID(id)

        this.data.cartData[index].selected = !selected
        this._updateCartData()
    },

    // 全选按钮
    selectAllTap(event) {
        let selected = event.currentTarget.dataset.selected
        let data = this.data.cartData
        for (let i = 0; i < data.length; i++) {
            data[i].selected = !selected
        }
        this._updateCartData()
    },

    // 改变商品数量
    changeCount(event) {
        let id = event.currentTarget.dataset.id
        let type = event.currentTarget.dataset.type
        let index = this._getIndexByID(id)
        let count = 1

        if (type === 'minus') {
            count = -1
        }

        this.data.cartData[index].count += count
        this._updateCartData()
    },

    // 删除商品
    delete(event) {
        let id = event.currentTarget.dataset.id
        let index = this._getIndexByID(id)
        this.data.cartData.splice(index, 1)
        this._updateCartData()
    },

    // 更新购物车页面的数据
    _updateCartData() {
        let newData = this._calTotalCountAndPrice()
        this.setData({
            selectedCount: newData.selectedCount,
            cartData: this.data.cartData,
            selectedType: newData.selectedType,
            totalPrice: newData.totalPrice
        })
    },

    // 计算选择的商品总数以及总金额
    _calTotalCountAndPrice() {
        let cartData = this.data.cartData
        let totalPrice = 0, selectedCount = 0, selectedType = 0
        let multiple = 100
        if(cartData.length !== 0){
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i].selected) {
                    totalPrice += (cartData[i].count) * (cartData[i].price * multiple)
                    selectedCount += cartData[i].count
                    selectedType++
                }
            }
        }

        return {
            selectedCount: selectedCount,
            selectedType: selectedType,
            totalPrice: totalPrice / (multiple)
        }
    },

    // 根据商品id获取商品下标
    _getIndexByID(id) {
        for (let i = 0; i < this.data.cartData.length; i++) {
            if (this.data.cartData[i].id === id) {
                return i
            }
        }
        return -1
    },

    toDetail(event) {
        let id = event.currentTarget.dataset.id
        let type = event.currentTarget.dataset.type
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id + '&type=' + type,
        })
    },

    // 跳转确认订单的页面
    submitOrder(event) {
        wx.navigateTo({
            url: '../order/order?totalPrice=' + this.data.totalPrice,
        })
    },

    isLoadedAll(event) {
        this.image.isLoadedAll()
    }
})