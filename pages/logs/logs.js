//logs.js
const util = require('../../utils/util.js')

const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    scanLogs: [],
    generateLogs: [],
    tabs: ["扫描", "生成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
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

    wx.getStorage({
      key: 'generateLogs',
      success: (res) => {
        this.setData({
          generateLogs: (res.data || []).map(n => {
            n.date = util.formatTime('YYYY-MM-DD HH:mm', new Date(n.date));
            return n;
          })
        })
      }
    })
  },
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sliderLeft: (res.windowWidth / this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})
