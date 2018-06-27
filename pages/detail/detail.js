import drawQrcode from '../../utils/weapp.qrcode.min.js'

Page({
  data: {
    id: 0,
    source: '',
    result: {
      isShow: false,
      type: '',
      text: '',
      msg: '',
    },
    tempFilePath: '',
  },
  onLoad(options) {
    this.setData({
      id: options.id,
      source: options.source,
    })

    const key = this.data.source == 'scan' ? 'scanLogs' : 'generateLogs';

    wx.getStorage({
      key,
      success: (res) => {
        console.log(res.data[options.id])
        this.setData({
          id: options.id,
          result: res.data[options.id]
        })

        drawQrcode({
          width: 200,
          height: 200,
          canvasId: 'qrCode',
          typeNumber: -1,
          text: this.data.result.text,
          callback: (e) => {
            // 绘制成功
            if (e.errMsg == 'drawCanvas:ok') {
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
      }
    })

    const title = this.data.source == 'scan' ? '扫描详情' : '生成详情';

    wx.setNavigationBarTitle({
      title,
    });
  },
  onCopy() {
    // 复制到剪贴板
    wx.setClipboardData({
      data: this.data.result.text,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  onDelete() {
    const key = this.data.source == 'scan' ? 'scanLogs' : 'generateLogs';

    // 删除
    wx.getStorage({
      key: key,
      complete: (res) => {
        console.log(res);
        let logs = res.data;
        logs.splice(this.data.id, 1);
        wx.setStorageSync(key, logs);
        wx.setStorage({
          key: key,
          data: logs,
          success: () => {
            wx.navigateBack();
          },
        })
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
