import { EditInfoModel } from '../../../model/edit-info-model.js'
let edit = new EditInfoModel()

Component({
  properties: {
    buyerInfo: {
      type: Object,
      value: {}
    },
    isCompleted: {
      type: Boolean,
      value: false
    }
  },

  data: {

  },

  methods: {
    // 跳转修改个人信息的页面
    editInfo(event) {
      wx.navigateTo({
        url: '../edit-info/edit-info?from=order',
      })
    }    
  }

})
