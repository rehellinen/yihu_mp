// pages/component/switch-tab/switch-tab.js
Component({
  properties: {
    tab: {
      type: Array,
      value: ['商品详情', '商家信息']
    },
    test: {
      type: String,
      value: '123'
    }
  },

  data: {
    currentTabsIndex: 0
  },

  methods: {
    onTabsItemTap(event) {
      let index = event.currentTarget.dataset.index
      this.setData({
        currentTabsIndex: index
      })
    }
  },

  options: {
    multipleSlots: true
  }
})
