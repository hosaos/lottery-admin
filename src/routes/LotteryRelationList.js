import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Radio, Button, Divider, Row, Col } from 'antd'
import styles from '../css/common.css';
import request from '../utils/request';
import Cookie from '../utils/cookie';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let timer = null
class LotteryRelationList extends React.Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'lotteryRelationList/get',
    //   payload: { pageIndex: 1, pageSize: 10 }
    // });
    // 每30秒刷一次也没
    // timer = setInterval(() => {
    //   this.props.dispatch({
    //     type: 'lotteryRelationList/get',
    //     payload: { pageIndex: 1, pageSize: 10 }
    //   });
    // }, 20 * 1000)

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
      type: 'lotteryRelationList/get',
      payload: { pageIndex: 1, pageSize: 10, lotteryWindowId }
    });
    timer = setInterval(() => {
      this.props.dispatch({
        type: 'lotteryRelationList/get',
        payload: { pageIndex: 1, pageSize: 10, lotteryWindowId }
      });
    }, 10 * 1000)
  };
  checkLottery = (record) => {
    this.props.dispatch({
      type: 'lotteryRelationList/setCurrentItem',
      payload: record,
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
          {`${record.bonus / 100}元`}
        </div>
      ),
    },
    {
      title: "操作",
      // key: 'action',
      render: (text, record) => (
        <span>
          {record.checkStatus === 'UNCHECK' ? <a onClick={this.checkLottery.bind(this, record)}>兑奖</a> : <p>已兑</p>}
        </span>
      ),
    }
  ]

  render() {
    const { loading, list, currentItem, windowList } = this.props;
    const windowButtons = windowList.map(d => <RadioButton key={d} value={d}>{`窗口${d}`}</RadioButton>);
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
              <h2>票号: {currentItem ? currentItem.ticketNumber : ""}</h2>
            </div>
            <div className="GridCell">
              <h2>类型: {currentItem ? currentItem.lotteryTypeName : ""}</h2>
            </div>
            <div className="GridCell">
              <h2>票面价: {currentItem ? `${currentItem.price / 100}元` : ""}</h2>
            </div>
            <div className="GridCell">
              <h2>购买用户: {currentItem ? currentItem.userName : ""}</h2>
            </div>
          </div>
          <div style={{ margin: "10px" }}>
            <Button type="primary">确认兑奖</Button>
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
  const { list, total, pageIndex, loading, currentItem, windowList } = state.lotteryRelationList;
  return {
    list,
    total,
    pageIndex,
    loading,
    currentItem,
    windowList,
  };
}
// function mapStateToProps({ list, currentItem, loading }) {
//   return { list, currentItem, loading };
// }

export default withRouter(connect(mapStateToProps)(LotteryRelationList));

