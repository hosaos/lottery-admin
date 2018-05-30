import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import LotteryOrderListFilter from './LotteryOrderListFilter'

let filterValue = {};
// class LotteryOrderList extends React.Component {
const LotteryOrderList = ({
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
      type: 'lotteryOrderList/get',
      payload: query,
    })
  };
  const columns = [
    {
      title: '订单id',
      dataIndex: 'id',
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
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
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '渠道id',
      dataIndex: 'channelId',
    },
    {
      title: '渠道名称',
      dataIndex: 'channelName',
    },
    {
      title: '订单票号',
      dataIndex: 'ticketNumber',
    },
    {
      title: '订单金额',
      dataIndex: 'totalPrice',
      render: (text, record) => (
        <div>
          {`${record.totalPrice / 1000}元`}
        </div>
      ),
    },
    {
      title: '彩票类型',
      dataIndex: 'lotteryTypeName',
    },
    {
      title: '购买张数',
      dataIndex: 'quantity',
    },
    {
      title: '中奖状态',
      dataIndex: 'bonusState',
    },
    {
      title: '支付类型',
      dataIndex: 'payType',
      render: (text, record) => (
        <div>
          {record.payType === 'ALIPAY' ? <label>支付宝</label> : record.payType === 'WEIXIN' ? <label>微信</label> : <label>余额</label>}
        </div>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      render: (text, record) => (
        <div>
          {record.orderStatus === 'WAIT_TO_PAY' ? <label>待支付</label> : record.orderStatus === 'PAYED' ? <label>已支付</label> : <label>已关闭</label>}
        </div>
      ),
    },
  ]

  return (
    <div>
      <LotteryOrderListFilter {...filterProps} />
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
  const { list, total, pageIndex, loading } = state.lotteryOrderList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(LotteryOrderList));
