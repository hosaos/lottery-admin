import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Radio, Button, Divider, Row, Col } from 'antd'
import styles from '../css/common.css';
import request from '../utils/request';
import Cookie from '../utils/cookie';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let timer = null;
let minKeyId = 0;
class LotteryRelationList extends React.Component {
  componentDidMount() {
    // 查看窗口权限
    const userId = Cookie.getItem("userId");
    request(`/user/getUserInfoById/${userId}`, {
      method: 'get',
    }).then((result) => {
      this.props.dispatch({
        type: 'lotteryRelationList/setWindowList',
        payload: { windowList: result.userLotteryWindows ? result.userLotteryWindows : [] }
      });
    }).catch((reason) => {
      console.log(`失败：${reason}`);
    });
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  onWindowChange = (e) => {
    // 清除已有定时器
    clearInterval(timer);
    // 重新开启一个针对当前windowId的定时器
    const lotteryWindowId = e.target.value;
    this.props.dispatch({
      type: 'lotteryRelationList/setCurrentWindow',
      payload: { lotteryWindowId }
    });
    this.props.dispatch({
      type: 'lotteryRelationList/reload',
    });
    timer = setInterval(() => {
      this.props.dispatch({
        type: 'lotteryRelationList/reload',
      });
    }, 10 * 1000)
  };

  onBonusChange = (e) => {
    this.props.dispatch({
      type: 'lotteryRelationList/setBonus',
      payload: { bonusId: e.target.value },
    })
  };
  getLotteryDetail = (record) => {
    this.props.dispatch({
      type: 'lotteryRelationList/setCurrentItem',
      payload: record,
    })
  };

  checkLottery = () => {
    this.props.dispatch({
      type: 'lotteryRelationList/checkLottery',
    })
  };
  columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '票号信息',
      dataIndex: 'ticketNumber',
    },
    {
      title: '彩票类型',
      dataIndex: 'lotteryTypeName',
    },
    {
      title: '彩照',
      dataIndex: 'photo',
    },
    {
      title: '用户',
      dataIndex: 'userName',
    },
    {
      title: '中奖状态',
      dataIndex: 'bonus',
      render: (text, record) => (
        <div>
          {record.checkStatus === 'CHECKED' ? `${record.bonus / 100}元` : ""}
        </div>
      ),
    },
    {
      title: "操作",
      // key: 'action',
      render: (text, record) => (
        <span>
          {record.checkStatus === 'UNCHECK' ? (minKeyId === record.id ? <a onClick={this.getLotteryDetail.bind(this, record)}>兑奖</a> : <label>待兑奖</label>)
            : <label>已兑</label>}
        </span>
      ),
    }
  ]

  render() {
    const { loading, list, currentItem, windowList, bonusList, buttonDisabled } = this.props;
    if (list) {
      for (const record of list) {
        if (record.checkStatus === 'UNCHECK') {
          minKeyId = record.id;
          break;
        }
      }
    }
    const windowButtons = windowList.map(d =>
      <span>
        <RadioButton key={d} value={d}>{`窗口${d}`}</RadioButton>
        <Divider type="vertical" />
      </span>
    );
    const bonusButtons = bonusList.map(d =>
      <span>
        <RadioButton value={d.id}>{`${d.bonus / 100}元`}</RadioButton>
        <Divider type="vertical" />
      </span>
    );
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <RadioGroup onChange={this.onWindowChange} size="large">
            {windowButtons}
          </RadioGroup>
        </div>
        <div style={{ textAlign: "center", border: "1px dotted grey", marginBottom: "10px" }}>
          <div className="Grid" style={{ margin: "10px" }}>
            <div className="GridCell">
              <h2>票号: <font color="red" size="5">{currentItem ? currentItem.ticketNumber : ""} </font> </h2>
            </div>
            <div className="GridCell">
              <h2>类型: {currentItem ? currentItem.lotteryTypeName : ""}</h2>
            </div>
            <div className="GridCell">
              <h2>票面价: {currentItem && currentItem.price ? `${currentItem.price / 100}元` : ""}</h2>
            </div>
            <div className="GridCell">
              <h2>购买用户: {currentItem ? currentItem.userName : ""}</h2>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <font color="red" size="5">中奖金额: </font>
            <RadioGroup onChange={this.onBonusChange} size="large">
              {bonusButtons}
            </RadioGroup>
          </div>
          <div style={{ margin: "15px" }}>
            <Button type="primary" onClick={this.checkLottery} disabled={buttonDisabled}>确认兑奖</Button>
          </div>
        </div>
        <Table
          columns={this.columns}
          dataSource={list}
          bordered
          rowKey={record => record.id}
          loading={loading}
          pagination={false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, pageIndex, loading, currentItem, windowList, bonusList, buttonDisabled, lotteryWindowId } = state.lotteryRelationList;
  return {
    list,
    total,
    pageIndex,
    loading,
    currentItem,
    windowList,
    bonusList,
    buttonDisabled,
    lotteryWindowId,
  };
}
// function mapStateToProps({ list, currentItem, loading }) {
//   return { list, currentItem, loading };
// }

export default withRouter(connect(mapStateToProps)(LotteryRelationList));

