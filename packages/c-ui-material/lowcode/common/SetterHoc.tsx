import React, { Component } from 'react';

export const SetterHoc = (Component: any) => {
  return class SetterComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  };
};
