// 配置文件
module.exports = {
    // 每日说配置项（必填项）
    // NAME: '老婆', //女朋友备注姓名
    // NICKNAME: 'C-Cristina', //女朋友昵称
    NAME: '林一', //女朋友备注姓名
    NICKNAME: '林一', //女朋友昵称

    HUG_DAY: '2021-02-14', // 心意日期
    HANDS_DAY: '2021-02-17',
    KISS_DAY: '2021-03-28',
    // 生日配置 过阴历生日，暂时写死
    BIRTHDAY: {
        2021: '2021-08-30',
        2022: '2022-08-20',
        2023: '2023-09-07',
        2024: '2024-08-26',
        2025: '2025-09-14',
        2026: '2026-09-04',
    }, // 每年生日 阳历
    BRITHYEAR: 1997,

    MOVIE_DAY: '2021-02-12',
    TOUR_DAY: '2021-04-02',
    SKY_WHEEL_DAY: '2021-04-10',

    CONFESSION_DAY: '2021-05-21',
    WILLING_DAY: '2021-05-23',
    HUSBAND_DAY: '2021-07-25',

    WEATHER: {
        appid: '93146818',
        appsecret: 'EsJolur2',
        cityid: '101020600', // 浦东
    },

    CITY: '101021300', //女朋友所在城市（城市名称，不要带“市”）
    // 测试用
    SENDDATE_WEATHER: '0 20/10 11 * * *',
    SENDDATE_REMIND: '0 20/10 11 * * 1-5', //定时提醒发送时间
    SENDDATE_MEMORIAL: '0 20/10 11 * * *', //纪念日提醒发送时间
    
    // SENDDATE_WEATHER: '0 30 8/12 * * *', //定时天气发送时间 每天8点30分0秒发送，规则见 /schedule/index.js
    // SENDDATE_REMIND: '0 30 10-17/2 * * 1-5', //定时提醒发送时间 
    // SENDDATE_MEMORIAL: '0 0 0 * * *', //纪念日提醒发送时间
    TXAPIKEY: '517ebb2e5f946dd9a55a4c3b3584a129', //此处须填写个人申请的天行apikey,请替换成自己的 申请地址https://www.tianapi.com/signup.html?source=474284281
   
    // 高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认开启, 关闭设置为: false
    DEFAULTBOT: '0', //设置默认聊天机器人 0 天行机器人 1 图灵机器人 2 天行对接的图灵机器人，需要到天行机器人官网充值（50元/年，每天1000次）
    AUTOREPLYPERSON: ['林一', '老婆'], //指定多个好友开启机器人聊天功能   指定好友的备注，最好不要带有特殊字符

    // (自定义) 如果你有 DIY 和基本的编程基础, 可以在这自己定义变量, 用于 js 文件访问, 包括设置简单的定时任务, 例如可以定义 task 数组
    // tasks: [{nick: 'personA', time: '早上', emoji: '🌝', action: 'eat xx', date: '0 0 8 * * *'}, 
    //         {nick: 'personA', time: '午饭后', emoji: '🌞', action: 'eat xx', date: '0 0 12 * * *'},
    //         {nick: 'personB', time: '晚饭前', emoji: '🌔', action: 'eat xx', date: '0 0 18 * * *'}, 
    //         {nick: 'personC', time: '睡前', emoji: '🌚', action: 'sleep', date: '0 0 22 * * *'}],
}
