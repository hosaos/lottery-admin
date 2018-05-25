import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import AppUserListFilter from './AppUserListFilter'

let filterValue = {};
// class AppUserList extends React.Component {
const AppUserList = ({
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
      type: 'appUserList/get',
      payload: query,
    })
  };
  const columns = [
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (text, record) => (
        <label>{record.sex === 'MEN' ? '男' : '女'}</label>
      ),
    },
    {
      title: '来源渠道',
      dataIndex: 'channelName',
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
    },
    {
      title: '账户余额',
      dataIndex: 'accountBalance',
      render: (text, record) => (
        <label>{`${record.accountBalance / 100} 元`}</label>
      ),
    },
  ]

  return (
    <div>
      <AppUserListFilter {...filterProps} />
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
  const { list, total, pageIndex, loading } = state.appUserList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(AppUserList));
