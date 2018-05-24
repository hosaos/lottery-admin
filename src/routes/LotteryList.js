import React from 'react';
import { connect } from 'dva';
import { withRouter }  from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import ChannelListFilter from './ChannelListFilter'
import ChannelModal from '../components/ChannelModal'
import QrCodeModal from '../components/QrCodeModal'

let filterValue = {};
// class ChannelList extends React.Component {
const LotteryList = ({
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
      type: 'channelList/get',
      payload: query,
    })
    // dispatch(Router.push({
    //   pathname: '/channels',
    //   query,
    // }));
  };

  const editHandler = (pkId, values) => {
    dispatch({
      type: 'channelList/edit',
      payload: { pkId, values },
    });
  }
  function createHandler(values, cb) {
    debugger;
    dispatch({
      type: 'channelList/create',
      payload: { values, cb }
    });
  }
  const columns = [
    {
      title: '渠道id',
      dataIndex: 'id',
    },
  ]

  return (
    <div>
      <ChannelListFilter {...filterProps} />
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
  const { list, total, pageIndex, loading } = state.channelList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(LotteryList));
