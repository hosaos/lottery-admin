import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import WinningListFilter from './WinningListFilter'

let filterValue = {};
// class WinningList extends React.Component {
const WinningList = ({
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

  const tableChangeHandler = (pagination, filters, sorter) => {
    handleRefresh({
      sortField: sorter.field,
      sortOrder: sorter.order === 'descend' ? 'desc' : 'asc',
      pageIndex: 1
    });
  }
  const handleRefresh = (query) => {
    dispatch({
      type: 'winningList/get',
      payload: query,
    })
  };
  const columns = [
    {
      title: '用户id',
      dataIndex: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
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
      title: '中奖金额',
      dataIndex: 'bonus',
      sorter: true,
      render: (text, record) => (
        <div>
          {`${record.bonus / 100}元`}
        </div>
      ),
    },
    {
      title: '开奖时间',
      dataIndex: 'checkTime',
    },
  ]

  return (
    <div>
      <WinningListFilter {...filterProps} />
      <Table
        columns={columns}
        dataSource={list}
        bordered
        rowKey={record => record.id}
        loading={loading}
        pagination={false}
        onChange={tableChangeHandler}
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
  const { list, total, pageIndex, loading } = state.winningList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(WinningList));
