import {Base} from './BaseModel.js'

class EditInfoModel extends Base{
  constructor(){
    super()
  }

  // 获取当前用户的信息
  getBuyerInfo(cb){
    let params = {
      url: 'buyer',
      callBack(res){
        cb && cb(res)
      }
    }
    this.request(params)
  }

  // 更新当前用户的信息
  updateBuyerInfo(data, cb){
    let params = {
      url: 'buyer',
      type: 'PUT',
      data: data,
      callBack(res){
        cb && cb(res)
      },
      eCallBack(res){
        cb && cb(res)
      }
    }
    this.request(params)
  }
}

export { EditInfoModel }
