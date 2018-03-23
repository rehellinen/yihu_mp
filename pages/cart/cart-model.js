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
    let isExisted = this._isExistedThatOne(item.id, cartData)

    if(isExisted.index == -1){
      item.count = count
      item.selected = true
      cartData.push(item)
    }else{
      cartData[isHasInfo.index].count += count
    }

    wx.setStorageSync(this._storageKeyName, cartData)
  }

  // 从缓存中获取所有购物车商品
  getCartDataFromLocal(){
    let res = wx.getStorageSync(this._storageKeyName)
    if(!res){
      res = [];
    }
    return res;
  }

  // 根据商品id判断此商品是否存在于缓存中
  // id->商品id；cartData->缓存中购物车商品
  _isExistedThatOne(id, cartData){
    let item, result = {index : -1}
    for(let i = 0; i < cartData.length; i++){
      item = arr[i]
      if(item.id == id){
        result = {
          data: item,
          index: i
        }
        break
      }
    }
    return result
  }
}

export { CartModel }