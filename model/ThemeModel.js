import {BaseModel} from './BaseModel.js'

class ThemeModel extends BaseModel {
    constructor() {
        super()
    }

    // 根据主题id获取分类
    getCategory(id, cb) {
        let params = {
            url: 'category/' + id,
            callBack(res) {
                cb && cb(res)
            }
        }
        this.request(params)
    }

    // 获取主题信息
    getTheme(cb) {
        let param = {
            url: 'theme',
            callBack: function (data) {
                cb && cb(data);
            }
        }
        this.request(param);
    }
}

export {ThemeModel}