import {BaseModel} from './BaseModel'

export class CartModel extends BaseModel {
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
        let res = this.getCartStorage()
        if (!res) {
            res = []
        }

        if (flag) {
            let newRes = []
            for(let item of res){
                if(item.selected){
                    newRes.push(item)
                }
            }
            res = newRes
        }

        return res
    }

    // 更新缓存数据
    setCartStorage(data){
        wx.setStorageSync(this._storageKeyName, data);
    }

    // 获取缓存
    getCartStorage(){
        return wx.getStorageSync(this._storageKeyName);
    }

    // 删除购物车中的商品
    // 1. ids [id的数组]
    delete(ids) {
        if (!(ids instanceof Array)) {
            ids = [ids]
        }
        let cartData = this.getCartDataFromLocal()
        for(let item of ids){
            let isExisted = this._isExistedThatOne(item, cartData)
            if (isExisted.index !== -1) {
                cartData.splice(isExisted.index, 1)
            }
        }
        this.setCartStorage(cartData)
    }

    // 获取购物车所有商品数量
    // 1. flag [true，考虑商品的选中状态]
    getCartTotalCount(flag = false) {
        let cartData = this.getCartDataFromLocal()
        let count = 0

        for(let item of cartData){
            if (flag) {
                if (item.selected === true) {
                    count += item.count
                }
            } else {
                count += item.count
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
        this.setCartStorage(cartData)
    }

    // 根据商品id判断此商品是否存在于缓存中
    // 1. id [商品]
    // 2. cartData [缓存中购物车商品]
    _isExistedThatOne(id, cartData) {
        let result = {index: -1}
        cartData.forEach( (item, index) => {
            if (item.id === id) {
                result = {
                    data: item,
                    index: index
                }
            }
        })
        return result
    }

    // 更新缓存中商品信息
    _updateStorageGoods(res, goods) {
        let data = []
        for (let item of res) {
            let id = item.id
            let goodsIndexObj = this._isExistedThatOne(id, goods)
            let index = goodsIndexObj.index
            let storageGoods = goodsIndexObj.data

            data[index] = item
            data[index].count = storageGoods.count
            data[index].selected = storageGoods.selected
        }
        this.setCartStorage(data)
    }
}