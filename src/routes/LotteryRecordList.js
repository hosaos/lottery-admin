import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import LotteryListRecordFilter from './LotteryListRecordFilter'

let filterValue = {};
// class ChannelList extends React.Component {
const LotteryRecordList = ({
                location, dispatch, loading, list, pageIndex, total
              }) => {
  // location.query = queryString.parse(location.search)
  // const { query, pathname } = location
  const filterProps = {
    filter: {
    },
    onFilterChange(value) {
      filterValue = value;
      handleRefresh({
        ...value,
        pageIndex: 1,
      })
    },
    onCreate(value, cb) {
      createHandler(value, cb);
    },
  }

  const pageChangeHandler = (page) => {
    handleRefresh({
      ...filterValue,
      pageIndex: page,
    })
  }

  const handleRefresh = (query) => {
    dispatch({
      type: 'lotteryRecordList/get',
      payload: query,
    })
  };
  function createHandler(values, cb) {
    dispatch({
      type: 'lotteryRecordList/create',
      payload: { values, cb }
    });
  }
  const columns = [
    {
      title: '票号信息',
      render: (text, record) => (
        <div>
          {record.start} - {record.end}
        </div>
      ),
    },
    {
      title: '彩票类型',
      dataIndex: 'lotteryTypeName',
    },
    {
      title: '张数',
      dataIndex: 'number',
    },
    {
      title: '归属窗口',
      dataIndex: 'lotteryWindowName',
    },
    {
      title: '操作人',
      dataIndex: 'userName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  return (
    <div>
      <LotteryListRecordFilter {...filterProps} />
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
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
        defaultCurrent={1}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, pageIndex, loading } = state.lotteryRecordList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(LotteryRecordList));
