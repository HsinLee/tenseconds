//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    totaltimes:3,
    UserGameDaily:{},
    userInfo: {},
    hasUserInfo: false,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    timer: null,
    flag:false,
    btn:"开始",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  start: function () {
    if (this.data.flag){
      this.data.flag = false;
      this.setData({
        btn: "开始"
      })
      this.getEnd();
      clearTimeout(this.timer);
    }else{
      this.data.flag = true;
      this.setData({
        btn: "停止",
        one: 0,
        two: 0,
        three: 0,
        four: 0,
      })
      this.getStart();
      this.timecount();
    }
    
  },
  getEnd:function(){
    console.log(this.data.one)
    if (this.data.one == 1 && this.data.two == 0 && this.data.three == 0 && this.data.four==0){
      var issuc = true;
    }else{
      var issuc = false;
    }
    wx.request({
      url: 'https://test.com/onLogin',
      data: {
        order_id: "res.code",
        score:'',
        success: issuc
      },
      success: function (data) {
        
      }
    })
  },
  getStart: function(){
    wx.request({
      url: 'https://test.com/onLogin',
      data: {},
      success: function (data) {
        if (data.ErrNo == 0) {
          me.setData({
            UserGameDaily: data.UserGameDaily
          })
        }
      }
    })
  },
  end: function () {
    this.data.flag=false;
    clearTimeout(this.timer)
  },
  timecount: function () {
    var me = this;
    if(this.data.flag){
      this.setData({
        four: this.data.four + 1
      })
    }
   
    if (this.data.four >= 9 && this.data.flag) {
      this.setData({
        four: 0,
        three: this.data.three + 1
      })
    }
    if (this.data.three >= 10 && this.data.flag) {
      this.setData({
        three: 0,
        two: this.data.two + 1
      })
    }
    if (this.data.two >= 10 && this.data.flag) {
      this.setData({
        two: 0,
        one: this.data.one + 1
      })
    }
    this.timer = setTimeout(me.timecount, 10)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var me = this;
    wx.login({
      success: function (res) {
        console.log(res.code)
        if (res.code) {
          //起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            },
            success:function(data){
              if(data.ErrNo==0){
                me.setData({
                  UserGameDaily: data.UserGameDaily
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  UserGameDaily:function(){
    var me = this;
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
