import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import Selector from './Selector'
import request from '../utils/request';

const FormItem = Form.Item;
const confirm = Modal.confirm;

class LotteryModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      typeList: [],
      windowList: []
    };
  }
  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
    // 请求typelist
    request('/lottery/type/list', {
      method: 'get',
    }).then((result) => {
      this.handleTypeList(result);
    }).catch((reason) => {
      console.log(`失败：${reason}`);
    });
    // 请求windowlist
    request('/lottery/window/list', {
      method: 'get',
    }).then((result) => {
      this.handleWindowList(result);
    }).catch((reason) => {
      console.log(`失败：${reason}`);
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
        const typeId = values.lotteryTypeId;
        const windowId = values.lotteryWindowId;
        this.state.typeList.map(d => d.id === typeId ? values.lotteryTypeName = d.name : "");
        this.state.windowList.map(d => d.id === windowId ? values.lotteryWindowName = d.name : "");
        confirm({
          title: <h2>确认彩票信息无误?</h2>,
          content: <div>
            <h2>{`类型: ${values.lotteryTypeName}`}</h2>
            <h2>{`窗口: ${values.lotteryWindowId}`}</h2>
            <h2>{`票号: ${values.start} - ${values.end}`}</h2>
          </div>,
          onOk() {
            console.log(values);
            onOk(values, cb);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    });
  };

  onInputChange = () => {
    const number = document.getElementById('number').value;
    const start = document.getElementById('start').value;
    if (number && start) {
      const end = parseInt(number, 10) + parseInt(start, 10);
      this.props.form.setFieldsValue({ end });
    }
  };

  onTypeChange = (value) => {
    this.props.form.setFieldsValue({ lotteryTypeId: value });
  }

  onWindowChange = (value) => {
    this.props.form.setFieldsValue({ lotteryWindowId: value });
  }

  handleTypeList = (data) => {
    const typeList = this.state.typeList;
    data.rows.map(d => typeList.push({ id: d.id, name: d.name }));
    this.setState({
      typeList,
    })
  };

  handleWindowList = (data) => {
    const windowList = this.state.windowList;
    data.rows.map(d => windowList.push({ id: d.id, name: d.windowName }));
    this.setState({
      windowList,
    })
  };
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="彩票信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          width={600}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="彩票类型"
            >
              {
                getFieldDecorator('lotteryTypeId', {
                  rules: [{ required: true, message: '请选择彩票类型!' }],
                })(<Selector
                  data={this.state.typeList}
                  handleChangeSelect={this.onTypeChange.bind(this)}
                />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="归属窗口"
            >
              {
                getFieldDecorator('lotteryWindowId', {
                  rules: [{ required: true, message: '请选择归属窗口!' }],
                })(<Selector
                  data={this.state.windowList}
                  handleChangeSelect={this.onWindowChange.bind(this)}
                />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="张数"
            >
              {
                getFieldDecorator('number', {
                  rules: [{ required: true, message: '请输入1-9999的数值!', pattern: '^\\+?[1-9][0-9]*$', max: 4 }],
                })(<Input id="number" onChange={this.onInputChange.bind(this)} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="起始票号"
            >
              {
                getFieldDecorator('start', {
                  rules: [{ required: true, message: '请输入起始票号(数值)!', pattern: '^\\+?[1-9][0-9]*$' }],
                })(<Input id="start" onChange={this.onInputChange.bind(this)} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="终止票号"
            >
              {
                getFieldDecorator('end', {
                  rules: [{ required: true, message: '请输入终止票号(数值)!', type: 'number' }],
                })(<Input id="end" disabled />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(LotteryModal);
