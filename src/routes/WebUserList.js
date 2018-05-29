import React from 'react';
import { connect } from 'dva';
import { withRouter }  from 'dva/router';
import { Table, Pagination, Popconfirm, Divider } from 'antd'
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

  const editHandler = (id, values) => {
    dispatch({
      type: 'webUserList/edit',
      payload: { id, values },
    });
  }
  function createHandler(values, cb) {
    dispatch({
      type: 'webUserList/create',
      payload: { values, cb }
    });
  }
  function resetPasswordHandler(values) {
    dispatch({
      type: 'webUserList/resetPassword',
      payload: { values }
    });
  }
  const columns = [
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: '员工姓名',
      dataIndex: 'fullName',
    },
    {
      title: '角色权限',
      dataIndex: 'menuNames',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
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
          <WebUserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>修改权限</a>
          </WebUserModal>
          <Divider type="vertical" />
          <Popconfirm title="确认将密码重置为:123456 ?" placement="right" onConfirm={resetPasswordHandler.bind(null, record.id)}>
            <a href="">重置密码</a>
          </Popconfirm>
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
