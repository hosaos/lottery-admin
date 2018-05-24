import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import ChannelListFilter from './ChannelListFilter'
import ChannelModal from '../components/ChannelModal'


// class ChannelList extends React.Component {
const ChannelList = ({
                location, dispatch, loading, list, pageIndex, total
              }) => {
  // location.query = queryString.parse(location.search)
  // const { query, pathname } = location

  const filterProps = {
    filter: {
    },
    onFilterChange(value) {
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
      pageIndex: page,
    })
  }

  const handleRefresh = (query) => {
    debugger;
    dispatch({
      type: 'channelList/get',
      payload: query,
    })
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
    {
      title: '渠道名称',
      dataIndex: 'channelName',
    },
    {
      title: '二维码',
      dataIndex: 'qrCode',
      render: (text, record) => (
        <span>
          {/* <AlgorithmInstanceModal record={record} onOk={editHandler.bind(null, record.pkId)}>*/}
          <a>查看</a>
          {/* </AlgorithmInstanceModal>*/}
        </span>
      ),
    },
    {
      title: '推广链接',
      dataIndex: 'referralInk',
    },
    {
      title: '渠道用户数',
      dataIndex: 'userNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: "操作",
      // key: 'action',
      render: (text, record) => (
        <span>
          <ChannelModal record={record} onOk={editHandler.bind(null, record.pkId)}>
            <a>修改</a>
          </ChannelModal>
          <Divider type="vertical" />
          <ChannelModal record={record} onOk={editHandler.bind(null, record.pkId)}>
            <a>明细</a>
          </ChannelModal>
        </span>
      ),
    }
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

export default withRouter(connect(mapStateToProps)(ChannelList));
