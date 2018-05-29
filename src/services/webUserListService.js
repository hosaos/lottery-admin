import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, mobile, fullName }) {
    const params = { pageIndex, pageSize: PAGE_SIZE, mobile, fullName };
    return request('/user/list/webUser', {
      method: 'get',
      data: params
    });
  },
  resetPassword(values) {
    return request(`/user/resetPassword/${values}`, {
      method: 'get',
    });
  },
  create(values) {
    return request('/user/save', {
      method: 'POST',
      data: values,
    });
  },
  edit(values) {
    return request('/user/edit', {
      method: 'POST',
      data: values,
    });
  },
}
