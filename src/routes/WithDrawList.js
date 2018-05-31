import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import WithDrawListFilter from './WithDrawListFilter'

let filterValue = {};
// class WithDrawList extends React.Component {
const WithDrawList = ({
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
      type: 'withDrawList/get',
      payload: query,
    })
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '用户id',
      dataIndex: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '提现金额',
      dataIndex: 'money',
      render: (text, record) => (
        <div>
          {`${record.money / 100}元`}
        </div>
      ),
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      render: (text, record) => (
        <div>
          { record.fee ? `${record.fee / 100}元` : "0元"}
        </div>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '银行名称',
      dataIndex: 'bankName',
    },
    {
      title: '银行卡号',
      dataIndex: 'cardNumber',
    },
    {
      title: '持卡人姓名',
      dataIndex: 'holderName',
    },
    {
      title: '身份证',
      dataIndex: 'identityCard',
    },
  ]

  return (
    <div>
      <WithDrawListFilter {...filterProps} />
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
  const { list, total, pageIndex, loading } = state.withDrawList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(WithDrawList));
