import React, { Component } from 'react';
import { Select } from 'antd';

export default class Selector extends Component {
  state = {
    data: [],
    value: '',
  };

  componentWillMount() {
    const data = [{ value: 'b', text: 'bbb' }]
    this.setState({
      data
    });
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Select
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {options}
      </Select>
    );
  }
}
