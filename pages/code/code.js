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
    codeText: ''
  },
  onLoad () {

  },
  bindInput: function(e) {
    this.setData({
      codeText: e.detail.value
    })
  },
  onGenerate () {
    console.log(this.data.codeText);
  }
})
