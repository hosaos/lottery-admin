import React, { Component } from 'react';
import { Modal, Form } from 'antd';

class PhotoModal extends Component {

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

  render() {
    const { children } = this.props;
    const { photo } = this.props.record;
    // const imageName = `${id}.jpg`;
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          // title={imageName}
          visible={this.state.visible}
          onCancel={this.hideModelHandler}
          onOk={this.hideModelHandler}
          width={800}
          // height={800}
        >
          <div style={{ textAlign: 'center' }}>
            <img src={photo} alt="lottery-img" height="700" width="700" />
          </div>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PhotoModal);
