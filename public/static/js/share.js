(function(){
    'use strict';
    if(!window) return;
    window['WXSHARE'] = {
        config: function(option) {

            var config = {"appId":"wx81a4a4b77ec98ff4","timestamp":"1511584769032","nonceStr":"9LiWj9GD8m4wTy9T","signature":"77eb85ad4f2b522f3ee903a4b4cc7bc443f20ecc"};

            option = option || {};
            var defaultOption = {
                debug: true,
                jsApiList: ['onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone', ],             
            }

            for(var key in option) {
                defaultOption[key] = option[key];
            }

            for(var k in defaultOption) {
                config[k] = defaultOption[k];
            }

            wx.config(config);
        },
        ready: function(cb) {
            if(cb) {
                return wx.ready(cb);
            }
            wx.ready(function() {
                option = option || {
                        title: "这是一个示例",
                        link: localtion.href,
                        imgUrl: 'https://redrock.cqupt.edu.cn/files/logo.png',
                        desc: '这是一个示例',
                        type: '',
                        success: function() {
                            console.log('分享成功');
                        },
                        cancel: function() {
                            console.log('取消分享');
                        }
                    }

                wx.onMenuShareTimeline(option);
                wx.onMenuShareAppMessage(option);
                wx.onMenuShareQQ(option);
                wx.onMenuShareWeibo(option);
                wx.onMenuShareQZone(option);
            });
        },
    }
}());