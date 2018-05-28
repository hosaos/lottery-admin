import React, { Component } from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class Selector extends Component {
  state = {
    options: [],
    indeterminate: true,
    checkAll: false,
    checkedList: [],
  };
  componentDidMount() {
    const options = this.props.options;
    this.setState({
      options
    });
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.state.options.length),
      checkAll: checkedList.length === this.state.options.length,
    });
    this.props.handleChange(checkedList);
  }
  onCheckAllChange = (e) => {
    const checkOptions = [];
    this.state.options.map(option => checkOptions.push(option.value));
    this.setState({
      checkedList: e.target.checked ? checkOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    this.props.handleChange(e.target.checked ? checkOptions : []);
  }
  render() {
    return (
      <div style={{ borderTop: '1px solid #E9E9E9' }}>
        <div>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            {this.props.checkName}
          </Checkbox>
          <br />
          <CheckboxGroup
            options={this.state.options} value={this.state.checkedList} onChange={this.onChange}
          />
        </div>
      </div>

    );
  }
}
