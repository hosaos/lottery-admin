import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Radio, Button, Divider, Row, Col } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import styles from '../css/common.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const filterValue = {};
// class LotteryRelationList extends React.Component {
const LotteryRelationList = ({
                location, dispatch, loading, list, pageIndex, total, currentItem
              }) => {
  const pageChangeHandler = (page) => {
    handleRefresh({
      pageIndex: page,
    })
  };

  const handleRefresh = (query) => {
    dispatch({
      type: 'lotteryRelationList/get',
      payload: query,
    })
  };

  const checkLottery = (record) => {
    dispatch({
      type: 'lotteryRelationList/setCurrentItem',
      payload: record,
    })
  };
  const columns = [
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
          {record.checkStatus === 'UNCHECK' ? <a onClick={checkLottery.bind(this, record)}>兑奖</a> : <p>已兑</p>}
        </span>
      ),
    }
  ]

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <RadioGroup defaultValue="a" size="large">
          <RadioButton value="a">Hangzhou</RadioButton>
          <RadioButton value="b">Shanghai</RadioButton>
          <RadioButton value="c">Beijing</RadioButton>
          <RadioButton value="d">Chengdu</RadioButton>
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
        columns={columns}
        dataSource={list}
        bordered
        rowKey={record => record.id}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, pageIndex, loading, currentItem } = state.lotteryRelationList;
  return {
    list,
    total,
    pageIndex,
    loading,
    currentItem,
  };
}

export default withRouter(connect(mapStateToProps)(LotteryRelationList));

