import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
class ChannelModal extends Component {

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
        // this.props.dispatch({
        //   type: 'channelList/edit',
        //   payload: { values },
        // });
      }
    });
  };
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, channelName } = this.props.record;
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
          title="渠道信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          width={800}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="id"
            >
              {
                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input disabled />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="渠道名"
            >
              {
                getFieldDecorator('channelName', {
                  rules: [{ required: true, message: '请输入渠道名!' }],
                  initialValue: channelName,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ChannelModal);
