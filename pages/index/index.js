//index.js
//获取应用实例
const app = getApp()

// 扫描类型
const scanType = {
  'WX_CODE': '微信小程序',
  'QR_CODE': '二维码',
  'EAN_8': '条形码（EAN_8）',
  'EAN_13': '条形码（EAN_13）',
  'UPC_A': '条形码（UPC_A）',
  'UPC_E': '条形码（UPC_E）',
  'CODE_25': '条形码（CODE_25）',
  'CODE_39': '条形码（CODE_39）',
  'CODE_128': '条形码（CODE_128）',
}

Page({
  data: {
    scanResult: {
      isShow: false,
      type: '',
      text: '',
      msg: '',
    },
  },
  onLoad: function () {

  },
  onScan: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        let msg = '';
        if (res.scanType === 'WX_CODE' && res.result === '') {
          msg = '宝宝心里苦，但宝宝不说...'
        }
        this.setData({
          scanResult: {
            isShow: true,
            type: scanType[res.scanType],
            text: res.result,
            msg,
          },
        });

        // 存入Storage
        if (this.data.scanResult.text !== '') {
          let scanLogs = wx.getStorageSync('scanLogs') || []
          this.data.scanResult.date = Date.now();
          scanLogs.unshift(this.data.scanResult);
          wx.setStorageSync('scanLogs', scanLogs);
        }
      }
    })
  },
  onCopy: function() {
    wx.setClipboardData({
      data: this.data.scanResult.text,
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
