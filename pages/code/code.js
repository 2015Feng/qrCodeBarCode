//index.js
//获取应用实例
const app = getApp()

import drawQrcode from '../../utils/weapp.qrcode.min.js'

Page({
  data: {
    codeText: '',
    isHidden: true,
    tempFilePath: '',
  },
  onLoad() {

  },
  bindInput: function (e) {
    this.setData({
      codeText: e.detail.value,
      isHidden: true,
    })
  },
  onGenerate() {
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'qrCode',
      typeNumber: -1,
      text: this.data.codeText,
      callback: (e) => {
        // 绘制成功
        if (e.errMsg == 'drawCanvas:ok') {
          this.setData({
            isHidden: false,
          })

          // 保存临时图片
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            destWidth: 200,
            destHeight: 200,
            canvasId: 'qrCode',
            success: (res) => {
              this.setData({
                tempFilePath: res.tempFilePath
              })
            }
          })
        }
      }
    })
  },
  onSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath,
      success: (res) => {
        wx.showToast({
          title: '已保存到相册',
        })
      },
      fail: (e) => {
        if (e.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
          wx.openSetting({
            success: (res) => {
              /*
               * res.authSetting = {
               *   "scope.userInfo": true,
               *   "scope.userLocation": true
               * }
               */
            }
          })
        }
      }
    })
  },
})
