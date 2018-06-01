import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import SettleMentListFilter from './SettleMentListFilter'

import PhotoModal from '../components/PhotoModal'

let filterValue = {};
// class SettleMentList extends React.Component {
const SettleMentList = ({
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
  }

  const pageChangeHandler = (page) => {
    handleRefresh({
      ...filterValue,
      pageIndex: page,
    })
  }

  const handleRefresh = (query) => {
    dispatch({
      type: 'settleMentList/get',
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
      title: '票面价',
      dataIndex: 'price',
      render: (text, record) => (
        <div>
          {`${record.price / 100}元`}
        </div>
      ),
    },
    {
      title: '彩照',
      dataIndex: 'photo',
      render: (text, record) => (
        <span>
          {record.photo ? <PhotoModal record={record}>
            <a>查看</a>
          </PhotoModal> : ""}
        </span>
      ),
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
      title: '结算状态',
      dataIndex: 'checkStatus',
      render: (text, record) => (
        <div>
          {record.checkStatus === 'UNCHECK' ? "未结算" : "已结算" }
        </div>
      ),
    },
    {
      title: '佣金',
      render: (text, record) => (
        <div>
          {`${record.price * 0.08 / 100}元`}
        </div>
      ),
    },
    {
      title: '用户',
      dataIndex: 'userName',
    },
    {
      title: '开奖窗口',
      dataIndex: 'lotteryWindowName',
    },
    {
      title: '开奖时间',
      dataIndex: 'checkTime',
    },
  ]

  return (
    <div>
      <SettleMentListFilter {...filterProps} />
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
  const { list, total, pageIndex, loading } = state.settleMentList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(SettleMentList));
