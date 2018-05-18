import {Config} from '../utils/config'
import {Token} from '../utils/token'

export class Base {
    constructor() {
        this.baseUrl = Config.restUrl
    }

    /**
     * 对微信的 http 请求进行封装
     * @param params 请求参数配置
     *  params参数:
     *  1. url [api地址]
     *  2. type [http请求方式]
     *  3. data [请求时携带的参数]
     *  4. callBack [回调函数]
     *  5. eCallBack [发送错误的处理函数]
     * @param noReFetch 是否重新发送请求
     */
    request(params, noReFetch) {
        let that = this
        let url = this.baseUrl + params.url
        if (!params.type) {
            params.type = 'GET'
        }

        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: function (res) {
                let code = res.statusCode.toString()
                let startChar = code.charAt(0)
                if (startChar === '2') {
                    params.callBack && params.callBack(res.data.data)
                } else {
                    if (code === '401') {
                        if (!noReFetch) {
                            that._reFetch(params)
                        } else {
                            params.eCallBack && params.eCallBack(res.data)
                        }
                    } else {
                        params.eCallBack && params.eCallBack(res.data)
                    }
                }
            },
            fail: function (err) {
                params.eCallBack && params.eCallBack(err)
            }
        })
    }

    // 重新发送请求
    _reFetch(params) {
        let token = new Token()
        token.getTokenFromServer((token) => {
            this.request(params, true)
        })
    }
}