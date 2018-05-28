import React, { Component } from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';

import PageCheckBox from './PageCheckBox'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class WebUserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      windowList: [],
      pageList: [],
      lotteryChecked: false,
      prizeChecked: false,
    };
  }
  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const cb = () => {
          this.hideModelHandler();
        }
        onOk(values, cb);
      }
    });
  };

  // 彩票管理点击事件
  onCheckLotteryChange(e) {
    this.setState({
      lotteryChecked: e.target.checked,
    });
  }
  // 兑奖管理点击事件
  onCheckPrizeChange(e) {
    this.setState({
      prizeChecked: e.target.checked,
    });
  }
  // 窗口多选框点击事件
  onWindowChange = (checkedList) => {
    this.setState({
      windowList: checkedList,
    });
  }
  // 后台管理页面多选框点击事件
  onPageChange = (checkedList) => {
    this.setState({
      pageList: checkedList,
    });
  }
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { fullName, mobile, id } = this.props.record;
    const disabled = !!id;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const windowOptions = [
      { label: '窗口1', value: '1' },
      { label: '窗口2', value: '2' },
      { label: '窗口3', value: '3' },
      { label: '窗口4', value: '4' },
      { label: '窗口5', value: '5' },
      { label: '窗口6', value: '6' },
      { label: '窗口7', value: '7' },
      { label: '窗口8', value: '8' },
      { label: '窗口9', value: '9' },
    ];
    const adminPageOptions = [
      { label: '数据概括', value: '3' },
      { label: '结算管理', value: '4' },
      { label: '用户管理', value: '5' },
      { label: '中奖纪录', value: '6' },
      { label: '订单管理', value: '7' },
      { label: '提现管理', value: '8' },
      { label: '渠道管理', value: '9' },
    ];
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="员工信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          width={800}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="员工姓名"
            >
              {
                getFieldDecorator('fullName', {
                  initialValue: fullName,
                })(<Input disabled={disabled} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {
                getFieldDecorator('mobile', {
                  initialValue: mobile,
                })(<Input disabled={disabled} />)
              }
            </FormItem>
          </Form>
          <div>
            <h3>角色权限</h3>
            <br />
            <div>
              <Checkbox
                checked={this.state.lotteryChecked}
                onChange={this.onCheckLotteryChange.bind(this)}
              >
              彩票管理
              </Checkbox>
            </div>
            <br />
            <div>
              <Checkbox
                checked={this.state.prizeChecked}
                onChange={this.onCheckPrizeChange.bind(this)}
              >
            兑奖管理
             </Checkbox>
            </div>
            <div>
              <CheckboxGroup
                disabled={!this.state.prizeChecked}
                options={windowOptions}
                value={this.state.windowList}
                onChange={this.onWindowChange.bind(this)}
              />
            </div>
            <div />
            <br />
            <div>
              后台管理
            </div>
            <div>
              <CheckboxGroup
                options={adminPageOptions}
                value={this.state.pageList}
                onChange={this.onPageChange.bind(this)}
              />
            </div>
            <div />
          </div>

        </Modal>
      </span>
    );
  }
}

export default Form.create()(WebUserModal);
