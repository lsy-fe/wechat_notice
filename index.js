const schedule = require('./schedule/index');
const config = require('./config/index');
const untils = require('./utils/index');
const superagent = require('./superagent/index');
const request = require('./superagent/superagent');

// 创建微信每日说定时任务
function initWeatherDay () {
  console.log(`已经设定每日说任务`);

  schedule.setSchedule(config.SENDDATE_MORNING_WEATHER, sendWeatherDay);
  schedule.setSchedule(config.SENDDATE_NIGHT_WEATHER, sendWeatherDay);
}

async function sendWeatherDay () {
  console.log('你的贴心小助理开始工作啦！');
  let logMsg;
  let one = await superagent.getOne(); //获取每日一句
  let weather = await superagent.getNewWeather(); //获取天气信息
  let today = await untils.formatDate(new Date()); //获取今天的日期
  let week = new Date().getDay();
  let str = '';

  const birthday = untils.getBirthday();
  // 1,3,6,
  const hugDay = untils.getDiffDay('HUG_DAY');
  const handsDay = untils.getDiffDay('HANDS_DAY');
  const kissDay = untils.getDiffDay('KISS_DAY');

  // 2,4
  const movieDay = untils.getDiffDay('MOVIE_DAY');
  const tourDay = untils.getDiffDay('TOUR_DAY');
  const skyWheelDay = untils.getDiffDay('SKY_WHEEL_DAY');

  // 5,7
  const confessionDay = untils.getDiffDay('CONFESSION_DAY');
  const willingDay = untils.getDiffDay('WILLING_DAY');
  const husbandDay = untils.getDiffDay('HUSBAND_DAY');
  let word = '';
  switch (week) {
    case 1:
    case 3:
    case 6:
      word = `第一次抱抱的第${hugDay}天\n第一次牵手的第${handsDay}天\n第一次亲亲的第${kissDay}天`;
      break;
    case 2:
    case 4:
      word = `第一次看电影的第${movieDay}天\n第一次旅行的第${tourDay}天\n第一次坐摩天轮的第${skyWheelDay}天`;
      break;
    case 5:
    case 7:
    case 0:
      word = `第一次表白的第${confessionDay}天\n第一次说“我也爱你，我愿意”的第${willingDay}天\n第一次喊老公的第${husbandDay}天`;
      break;
  }
  // PS: 如果需要插入 emoji(表情), 可访问 "https://getemoji.com/" 复制插入
  str = `${today}\n\n今天是我们\n${word}\n距离宝贝老婆的生日还有${birthday}天\n\n${weather}\n每日一句\n${one}\n\n今天也是超级爱宝贝老婆的一天~💕`;

  try {
    logMsg = str;
    console.log('发送每日说');
    await send(str); // 发送消息
  } catch (e) {
    logMsg = e.message;
  }
  console.log(logMsg);
}

function initRemind () {
  console.log(`已经设定定时提醒任务`);

  config.SENDDATE_REMIND.map(item => schedule.setSchedule(item, sendRemind))
}

async function sendRemind () {
  let logMsg;
  let now = await untils.formatDate(new Date(), 'mins');
  let sweetWord = await superagent.getSweetWord();
  let str = `${now}\n\n我的晨晨小宝贝，到了休息时间啦！起来走走，活动一下，喝口水，休息一下再继续~\n\n${sweetWord}\n\n————我真的好爱好爱你呀~❤️`;

  try {
    logMsg = str;
    console.log('发送定时提醒');
    await send(str); // 发送消息
  } catch (e) {
    logMsg = e.message;
  }
  console.log(logMsg);
}

async function initMemorialDay () {
  console.log(`已经设定纪念日提醒任务`);

  schedule.setSchedule(config.SENDDATE_MEMORIAL, async () => {
    let logMsg;
    let today = await untils.formatDate(new Date()); //获取今天的日期
    const birthday = untils.getBirthday();
    let str = '';

    const diffArray = ['HUG_DAY', 'HANDS_DAY', 'KISS_DAY', 'MOVIE_DAY', 'TOUR_DAY', 'SKY_WHEEL_DAY', 'CONFESSION_DAY', 'WILLING_DAY', 'HUSBAND_DAY'];
    const resultArray = diffArray.map(item => untils.getSameDay(item));
    const theSame = resultArray.filter(item => item.result);
    // if (theSame.length) {
    //   getDiffYear(theSame[0].type);
    //   str = `${today}\n\n`;
    // } else
    if (!birthday) {
      str = `${today}\n\n今天是我的小仙女老婆人生当中第${untils.getBirthYear()}个生日！全世界最可爱的小仙女，祝你生日快乐呀~天呐？！我的小仙女终于上高中了！我终于可以光明正大名正言顺地和我的仙女老婆谈恋爱啦！想成为你开心时第一个想分享的人，难过时想要依靠的人；想成为你生命里无法缺少的那一部分，想成为你坚定地牵手走到最后的人！想让与你在一起的每一天都充满新鲜感、仪式感，让你都难以忘记！希望今天能够成为我的仙女老婆这一年到目前为止最开心的一天~💞`
    }

    if (str) {
      try {
        logMsg = str;
        console.log('发送纪念日提醒');
        await send.say(str); // 发送消息
      } catch (e) {
        logMsg = e.message;
      }
      console.log(logMsg);
    }
  });
}

async function send (content) {
  let token = await superagent.getToken();
  let url = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + token;
  console.log('token', token)
  const data = {
    touser: "@all",
    msgtype: 'text',
    agentid: 1000002,
    text: {
      content: content
    }
  }

  try {
    let res = await request.req({ url, method: 'POST', data: JSON.stringify(data) });
    console.log('info', res.errmsg)
    return res.errmsg;
  } catch (err) {
    console.log('获取token出错', err);
  }
} 

initWeatherDay();
initRemind();
initMemorialDay();

