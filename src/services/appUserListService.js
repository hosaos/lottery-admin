import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, mobile }) {
    const params = { pageIndex, pageSize: PAGE_SIZE, mobile };
    return request('/user/list/appUser', {
      method: 'get',
      data: params
    });
  },
}
