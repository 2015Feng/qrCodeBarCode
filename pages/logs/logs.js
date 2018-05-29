//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    scanLogs: []
  },
  onLoad: function () {
    this.setData({
      scanLogs: (wx.getStorageSync('scanLogs') || []).map(n => {
        n.date = util.formatTime(new Date(n.date));
        return n;
      })
    })
  }
})
