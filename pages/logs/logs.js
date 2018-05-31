//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    scanLogs: []
  },
  onShow () {
    wx.getStorage({
      key: 'scanLogs',
      success: (res) => {
        this.setData({
          scanLogs: (res.data || []).map(n => {
            n.date = util.formatTime('YYYY-MM-DD HH:mm', new Date(n.date));
            return n;
          })
        })
      }
    })
  },
})
