import {Base} from '../../utils/base.js'

class PersonalModel extends Base
{
  constructor(){
    super()
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

export { PersonalModel }