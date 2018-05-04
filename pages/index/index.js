//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scanText: '',
  },
  onLoad: function () {

  },
  onScan: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        this.setData({
          scanText: res.result,
        });
      }
    })
  },
  onCopy: function() {
    wx.setClipboardData({
      data: this.data.scanText,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
})
