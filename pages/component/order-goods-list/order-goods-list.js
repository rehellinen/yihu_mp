let app = getApp()

Component({
  properties: {
    goods: Array,
    type: Number
  },

  data: {

  },

  methods: {
    loaded(event){
      var myEventDetail = {} 
      var myEventOption = {} 
      this.triggerEvent('loaded', myEventDetail, myEventOption)      
    },

    toDetail(event){
      let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      if(!type){
        return 0
      }
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id + '&type=' + type, 
      })
    },

    remark(event){
      let id = event.currentTarget.dataset.id
      let remark = event.detail.value
      let myEventDetail = {
        id, remark
      }

      this.triggerEvent('remark', myEventDetail)
    }
  }
})
