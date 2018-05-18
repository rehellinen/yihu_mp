import {BaseModel} from './BaseModel.js'

export class UserModel extends BaseModel{
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

    // 获取用户的微信信息
    getUserInfo(cb){
        let that = this
        wx.login({
            success(res){
                wx.getUserInfo({
                    success(res){
                        cb && cb(res.userInfo)
                    },
                    fail(res){
                        let defaultInfo = {
                            nickName: 'tuntematon',
                            avatarUrl: '/images/theme/personal@avatar.jpg'
                        }
                        cb && cb(defaultInfo)
                    }
                })
            }
        })
    }
}