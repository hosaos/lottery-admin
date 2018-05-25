import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Table, Pagination, Button, Divider } from 'antd'
import { PAGE_SIZE } from '../utils/constant'
import WebUserListFilter from './WebUserListFilter'
import WebUserModal from '../components/WebUserModal'

let filterValue = {};
// class WebUserList extends React.Component {
const WebUserList = ({
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
      type: 'webUserList/get',
      payload: query,
    })
  };

  const editHandler = (pkId, values) => {
    dispatch({
      type: 'webUserList/edit',
      payload: { pkId, values },
    });
  }
  function createHandler(values, cb) {
    dispatch({
      type: 'webUserList/create',
      payload: { values, cb }
    });
  }
  const columns = [
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: "操作",
      // key: 'action',
      render: (text, record) => (
        <span>
          <WebUserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>修改权限</a>
          </WebUserModal>
          <Divider type="vertical" />
          <a>重置密码</a>
        </span>
      ),
    }
  ]

  return (
    <div>
      <WebUserListFilter {...filterProps} />
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
  const { list, total, pageIndex, loading } = state.webUserList;
  return {
    list,
    total,
    pageIndex,
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(WebUserList));
