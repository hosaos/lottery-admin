import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination } from 'antd'
import { PAGE_SIZE } from '../utils/constant'

class ChannelList extends React.Component {
// function ChannelList({ props, dispatch, list: total, page}) {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'channels',
    //   query: { page: 1 },
    // });
    this.props.dispatch({
      type: 'channelList/get',
      payload: { pageIndex: 1, pageSize: PAGE_SIZE },
    })

    // this.props.dispatch(routerRedux.push({
    //   pathname: '/channels',
    //   query: { page: 1 },
    // }));
  }
  pageChangeHandler(page) {
    this.props.dispatch({
      type: 'channelList/get',
      payload: { pageIndex: page, pageSize: PAGE_SIZE },
    })
  }


  columns = [
    {
      title: '渠道id',
      dataIndex: 'id',
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
          {/* <AlgorithmInstanceModal record={record} onOk={editHandler.bind(null, record.pkId)}>*/}
          <a>修改</a>
          {/* </AlgorithmInstanceModal>*/}
        </span>
      ),
    }
  ]
  render() {
    const { list, total, pageIndex, loading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={list}
          bordered
          size="middle"
          rowKey={record => record.id}
          loading={loading}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={pageIndex}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler.bind(this)}
        />
      </div>
    );
  }
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
