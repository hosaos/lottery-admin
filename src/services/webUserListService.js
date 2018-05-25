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
}
