import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, userName }) {
    const params = { pageIndex, pageSize: PAGE_SIZE, userName };
    return request('/withdraw/record/list', {
      method: 'get',
      data: params
    });
  }
}
