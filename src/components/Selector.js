import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default class Selector extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    const data = this.props.data;
    this.setState({
      data
    });
  }
  handleChange = (value) => {
    this.props.handleChangeSelect(value)
  }
  render() {
    const options = this.state.data.map(d => <Option value={d.id}>{d.name}</Option>);
    return (
      <Select onChange={this.handleChange}>
        {options}
      </Select>
    );
  }
}
