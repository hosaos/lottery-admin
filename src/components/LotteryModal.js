import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import Selector from './Selector'

const FormItem = Form.Item;
class LotteryModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  onChange = () => {
    const number = document.getElementById('number').value;
    const start = document.getElementById('start').value;
    if (number && start) {
      const end = parseInt(number, 10) + parseInt(start, 10);
      this.props.form.setFieldsValue({ end });
    }
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
                getFieldDecorator('saveType', {
                  rules: [{ required: true }],
                })(<Selector />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="归属窗口"
            >
              {
                getFieldDecorator('saveType', {
                  rules: [{ required: true }],
                })(<Selector />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="张数"
            >
              {
                getFieldDecorator('number', {
                  rules: [{ required: true, message: '请输入1-9999的数值!', pattern: '^\\+?[1-9][0-9]*$', max: 4 }],
                })(<Input id="number" onChange={this.onChange.bind(this)} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="起始票号"
            >
              {
                getFieldDecorator('start', {
                  rules: [{ required: true, message: '请输入起始票号(数值)!', pattern: '^\\+?[1-9][0-9]*$' }],
                })(<Input id="start" onChange={this.onChange.bind(this)} />)
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
