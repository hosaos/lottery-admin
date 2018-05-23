import request from '../utils/request';

export default {
  getList({ pageIndex, pageSize }) {
    debugger;
    const params = { pageIndex, pageSize };
    return request('/channel/pageList', {
      method: 'get',
      data: params
    });
  },
  getDetail(account) {
    return request(`/getDetail?account=${account}`)
  }
}
