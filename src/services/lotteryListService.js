import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, channelName }) {
    const params = { pageIndex, pageSize: PAGE_SIZE, channelName };
    return request('/lottery/list/page', {
      method: 'get',
      data: params
    });
  },
  edit(pkId, values) {
    return request('/lottery/edit', {
      method: 'POST',
      data: values,
    });
  },
  create(values) {
    return request('/lottery/save', {
      method: 'POST',
      data: values,
    });
  },
  getDetail(account) {
    return request(`/getDetail?account=${account}`)
  }
}
