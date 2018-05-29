import dva from 'dva';
import createHistory from 'history/createHashHistory'
import { message } from 'antd';
import './index.less';

// Initialize
const app = dva({
  history: createHistory(),
  onError(err) {
    const errorMsg = err.message;
    message.error(errorMsg)
  }
});

app.model(require("./models/login"));
app.model(require("./models/list"));
app.model(require("./models/appUserList"));
app.model(require("./models/webUserList"));
app.model(require("./models/channelList"));
app.model(require("./models/lotteryRecordList"));


// Router
app.router(require('./router'));

// Start
app.start('#root');
