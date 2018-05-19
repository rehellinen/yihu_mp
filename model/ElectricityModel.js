import {BaseModel} from "./BaseModel"

export class ElectricityModel extends BaseModel{
    constructor(){
        super()
    }

    // 获取近三日电费
    getThreeDays(cb){
        let params = {
            url: 'electricity/three',
            callBack(res){
                cb && cb(res)
            }
        }

        this.request(params)
    }

    // 获取剩余电费
    getSurplus(cb){
        let params = {
            url: 'electricity/surplus',
            callBack(res){
                cb && cb(res)
            }
        }

        this.request(params)
    }
}