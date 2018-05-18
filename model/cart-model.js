import {Base} from './base.js'

class CartModel extends Base {
    constructor() {
        super()
        this._storageKeyName = 'cart'
    }

    // 添加商品到购物车
    // 1. goods [商品]
    // 2. count [数量]
    // 3. eCallBack [发生错误时的回调]
    add(goods, count, eCallBack) {
        let cartData = this.getCartDataFromLocal()
        let isExisted = this._isExistedThatOne(goods.id, cartData)

        if (isExisted.index === -1) {
            // index为-1代表商品不存在购物车中
            goods.count = count
            goods.selected = true
            cartData.push(goods)
        } else {
            if ((cartData[isExisted.index].count + count) <= cartData[isExisted.index].quantity) {
                cartData[isExisted.index].count += count
            } else {
                eCallBack && eCallBack()
            }
        }

        wx.setStorageSync(this._storageKeyName, cartData)
    }

    // 从缓存中获取所有购物车商品
    // 1. flag [true，只获取选中的商品;false，获取所有商品]
    getCartDataFromLocal(flag) {
        let res = wx.getStorageSync(this._storageKeyName)
        if (!res) {
            res = []
        }

        if (flag) {
            let newRes = []
            for (let i = 0; i < res.length; i++) {
                if (res[i].selected) {
                    newRes.push(res[i])
                }
            }
            res = newRes
        }

        return res
    }

    // 根据商品id判断此商品是否存在于缓存中
    // 1. id [商品]
    // 2. cartData [缓存中购物车商品]
    _isExistedThatOne(id, cartData) {
        let result = {index: -1}
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i].id === id) {
                result = {
                    data: cartData[i],
                    index: i
                }
                break
            }
        }
        return result
    }

    // 增加购物车中商品的数量
    plusCount(id) {
        this._updateCount(id, 1)
    }

    // 减少购物车中商品的数量
    minusCount(id) {
        this._updateCount(id, -1)
    }

    // 删除购物车中的商品
    // 1. ids [id的数组]
    delete(ids) {
        if (!(ids instanceof Array)) {
            ids = [ids]
        }
        let cartData = this.getCartDataFromLocal()
        for (let i = 0; i < ids.length; i++) {
            let isExisted = this._isExistedThatOne(ids[i], cartData)
            if (isExisted.index !== -1) {
                cartData.splice(isExisted.index, 1)
            }
        }
        wx.setStorageSync(this._storageKeyName, cartData)
    }

    // 获取购物车所有商品数量
    // 1. flag [true，考虑商品的选中状态]
    getCartTotalCount(flag = false) {
        let cartData = this.getCartDataFromLocal()
        let count = 0
        for (let i = 0; i < cartData.length; i++) {
            if (flag) {
                if (cartData[i].selected === true) {
                    count += cartData[i].count
                }
            } else {
                count += cartData[i].count
            }
        }
        return count
    }

    // 修改商品数量
    // 1. id [商品id]
    // 2. count [数量]
    _updateCount(id, count) {
        let cartData = this.getCartDataFromLocal()
        let isExisted = this._isExistedThatOne(id, cartData)
        if (isExisted.index !== -1) {
            if (isExisted.data.count > 1) {
                cartData[isExisted.index].count += count
            }
        }
        wx.setStorageSync(this._storageKeyName, cartData)
    }

    // 更新购物车中商品信息
    updateGoods(cb) {
        let goods = this.getCartDataFromLocal()
        if (goods.length === 0) {
            cb && cb()
            return
        }
        let ids = []
        for (let index in goods) {
            ids.push(goods[index].id)
        }
        let idsStr = ids.join('|')
        let that = this
        let params = {
            url: 'goods/check',
            data: {
                ids: idsStr
            },
            callBack: (res) => {
                this.updateStoragePrice(res, goods)
                cb && cb()
            }
        }
        this.request(params)
    }

    // 更新购物车中商品信息
    updateStoragePrice(res, goods) {
        let data = []
        for (let i in res) {
            let id = res[i].id
            let goodsIndexObj = this._isExistedThatOne(id, goods)
            let index = goodsIndexObj.index
            let storageGoods = goodsIndexObj.data
            data[index] = res[i]
            data[index].count = storageGoods.count
            data[index].selected = storageGoods.selected
        }
        wx.setStorageSync(this._storageKeyName, data)
    }
}

export {CartModel}