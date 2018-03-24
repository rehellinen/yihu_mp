import {Base} from '../../utils/base.js'

class CartModel extends Base{
  constructor(){
    super()
    this._storageKeyName = 'cart'
  }

  // 添加到购物车的方法
  // 没有该商品时，新增商品；有该商品时，增加数量
  // goods->商品；count->数量
  add(goods, count){
    let cartData = this.getCartDataFromLocal()
    let isExisted = this._isExistedThatOne(goods.id, cartData)

    if(isExisted.index == -1){
      goods.count = count
      goods.selected = true
      cartData.push(goods)
    }else{
      cartData[isExisted.index].count += count
    }

    wx.setStorageSync(this._storageKeyName, cartData)
  }

  plusCount(id){
    this._updateCount(id, 1)
  }

  minusCount(id){
    this._updateCount(id, -1)
  }

  // delete(ids){
  //   if(!(ids instanceof Array)){
  //     ids = [ids]
  //   }
  //   let cartData = this.getCartDataFromLocal();
  //   for(let i = 0; i < ids.length; i++){
  //     let isExisted = this._isExistedThatOne(ids[i], cartData)
  //     if(isExisted.index != -1){
  //       cartData.splice(isExisted.index, 1)
  //     }
  //   }
  //   wx.setStorageSync(this._storageKeyName, cartData)
  // }

  // 从缓存中获取所有购物车商品
  getCartDataFromLocal(){
    let res = wx.getStorageSync(this._storageKeyName)
    if(!res){
      res = [];
    }
    return res;
  }

  // 获取购物车所有商品数量
  // flag为true时考虑商品的选中状态
  getCartTotalCount(flag = false){
    let cartData = this.getCartDataFromLocal()
    let count = 0
    for(let i = 0; i < cartData.length; i++){
      if(flag){
        if(cartData[i].selected == true){
          count += cartData[i].count
        }
      }else{
        count += cartData[i].count
      }      
    }
    return count
  }

  // 根据商品id判断此商品是否存在于缓存中
  // id->商品id；cartData->缓存中购物车商品
  _isExistedThatOne(id, cartData) {
    let item, result = { index: -1 }
    for (let i = 0; i < cartData.length; i++) {
      item = cartData[i]
      if (item.id == id) {
        result = {
          data: item,
          index: i
        }
        break
      }
    }
    return result
  }

  // 修改商品数量
  // id->商品id；count->数量
  _updateCount(id, count){
    let cartData = this.getCartDataFromLocal()
    let isExisted = this._isExistedThatOne(id, cartData)
    if(isExisted.index != -1){
      if (isExisted.data.count > 1){
        cartData[isExisted.index].count += count
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData)
  }
}

export { CartModel }