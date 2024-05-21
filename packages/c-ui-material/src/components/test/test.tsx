import React, { Component, createElement, createRef } from 'react';
// import { Form as OriginalForm } from 'antd';

export interface TestProps {
  cols: number;
}

class Test extends Component<TestProps, any> {
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        12
        {this.props.children}
      </div>
    );
  }
}

export default Test;
