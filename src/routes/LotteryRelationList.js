import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider, Row, Col } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import styles from '../css/common.css';

const filterValue = {};
// class LotteryRelationList extends React.Component {
const LotteryRelationList = ({
                location, dispatch, loading, list, pageIndex, total
              }) => {
  const pageChangeHandler = (page) => {
    handleRefresh({
      pageIndex: page,
    })
  }

  const handleRefresh = (query) => {
    dispatch({
      type: 'lotteryRelationList/get',
      payload: query,
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
    },
    {
      title: "操作",
      // key: 'action',
      render: (text, record) => (
        <span>
          {record.checkStatus === 'UNCHECK' ? <a>兑奖</a> : <p>已兑</p>}
        </span>
      ),
    }
  ]

  return (
    <div>
      <div style={{ textAlign: "center", border: "1px dotted grey", marginBottom: "10" }}>
        <div className="Grid" style={{ margin: "10" }}>
          <div className="GridCell">
            <h2>票号:</h2>
          </div>
          <div className="GridCell">
            <h2>类型:</h2>
          </div>
          <div className="GridCell">
            <h2>票面价:</h2>
          </div>
          <div className="GridCell">
            <h2>购买用户:</h2>
          </div>
        </div>
        <div style={{ margin: "10" }}>
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
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={pageIndex}
        pageSize={10}
        onChange={pageChangeHandler}
        defaultCurrent={1}
      />
    </div>
  );
}

function mapStateToProps(state) {
  debugger;
  const { list, total, pageIndex, loading } = state.lotteryRelationList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(LotteryRelationList));

