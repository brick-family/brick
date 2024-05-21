import React, { FC } from 'react';
import { Button } from 'antd';
import _ from 'lodash';

import { PermSelectProvider, usePermSelectSelector } from '@brick/biz-component';
import { observable } from '@legendapp/state';
import { useSelector } from '@legendapp/state/react';
import { QueryBuilder } from '@brick/component';

const d = {
  code: '0000',
  message: '查询成功',
  total: 0,
  data: {
    columns: [
      {
        id: '1679317816169332736',
        dbTableName: 'b_lglo8rhp_0018',
        dbFieldName: 'id',
        fieldType: 'STRING',
        handleType: '',
        title: '编号',
        // disabled: true,
        placeholder: null,
        description: null,
        decimalPlace: null,
        thousands: null,
        status: null,
        format: null,
        defaultValueType: null,
        defaultValue: null,
        position1: null,
        position2: null,
        isRequired: null,
        isRepeat: null,
        extraParam: null,
        isDelete: false,
        createTime: '2023-07-13T02:32:22.248+0000',
        updateTime: '2023-07-13T02:32:22.248+0000',
      },
      {
        id: '1679317816173527040',
        dbTableName: 'b_lglo8rhp_0018',
        dbFieldName: 'is_delete',
        fieldType: 'INT',
        handleType: '',
        title: null,
        placeholder: null,
        description: null,
        decimalPlace: null,
        thousands: null,
        status: null,
        format: null,
        defaultValueType: null,
        defaultValue: null,
        position1: null,
        position2: null,
        isRequired: null,
        isRepeat: null,
        extraParam: null,
        isDelete: false,
        createTime: '2023-07-13T02:32:22.249+0000',
        updateTime: '2023-07-13T02:32:22.249+0000',
      },
      {
        id: '1679317816173527041',
        dbTableName: 'b_lglo8rhp_0018',
        dbFieldName: 'create_time',
        fieldType: 'DATE',
        handleType: '',
        title: '创建日期',
        placeholder: null,
        description: null,
        decimalPlace: null,
        thousands: null,
        status: null,
        format: null,
        defaultValueType: null,
        defaultValue: null,
        position1: null,
        position2: null,
        isRequired: null,
        isRepeat: null,
        extraParam: null,
        isDelete: false,
        createTime: '2023-07-13T02:32:22.249+0000',
        updateTime: '2023-07-13T02:32:22.249+0000',
      },
      {
        id: '1679317816177721344',
        dbTableName: 'b_lglo8rhp_0018',
        dbFieldName: 'update_time',
        fieldType: 'DATE',
        handleType: '',
        title: '修改日期',
        placeholder: null,
        description: null,
        decimalPlace: null,
        thousands: null,
        status: null,
        format: null,
        defaultValueType: null,
        defaultValue: null,
        position1: null,
        position2: null,
        isRequired: null,
        isRepeat: null,
        extraParam: null,
        isDelete: false,
        createTime: '2023-07-13T02:32:22.250+0000',
        updateTime: '2023-07-13T02:32:22.250+0000',
      },
      {
        id: '1679317879801118720',
        dbTableName: 'b_lglo8rhp_0018',
        dbFieldName: 'column1',
        fieldType: 'STRING',
        handleType: '',
        title: '单行文本111',
        placeholder: '请输入',
        description: '',
        decimalPlace: null,
        thousands: null,
        status: 1,
        format: '1',
        defaultValueType: null,
        defaultValue: '',
        position1: null,
        position2: null,
        isRequired: null,
        isRepeat: null,
        extraParam: null,
        isDelete: false,
        createTime: '2023-07-13T02:32:37.419+0000',
        updateTime: '2023-07-13T02:32:37.419+0000',
      },
      {
        id: '1679317879847256064',
        dbTableName: 'b_lglo8rhp_0018',
        dbFieldName: 'column2',
        fieldType: 'TEXT',
        handleType: '',
        title: '多行文本22',
        placeholder: '请输入',
        description: '',
        decimalPlace: null,
        thousands: null,
        status: 1,
        format: '1',
        defaultValueType: null,
        defaultValue: '',
        position1: null,
        position2: null,
        isRequired: null,
        isRepeat: null,
        extraParam: null,
        isDelete: false,
        createTime: '2023-07-13T02:32:37.430+0000',
        updateTime: '2023-07-13T02:32:37.430+0000',
      },
    ],
    title: '未命名的表单2323',
    id: '1679317815582130176',
    schema:
      '{"version":"1.0.0","componentsMap":[{"package":"contain-ui-material","version":"0.1.12","exportName":"FormContainer","main":"src/index.ts","destructuring":true,"subName":"","componentName":"FormContainer"},{"devMode":"lowCode","componentName":"Page"},{"package":"contain-ui-material","version":"0.1.12","exportName":"FieldInput","main":"src/index.ts","destructuring":true,"subName":"","componentName":"FieldInput"},{"package":"contain-ui-material","version":"0.1.12","exportName":"FieldTextarea","main":"src/index.ts","destructuring":true,"subName":"","componentName":"FieldTextarea"}],"componentsTree":[{"componentName":"Page","id":"node_dockcviv8fo1","props":{"ref":"outerView","style":{"height":"100%"}},"fileName":"/","dataSource":{"list":[{"type":"fetch","isInit":true,"options":{"params":{},"method":"GET","isCors":true,"timeout":5000,"headers":{}},"id":"info","shouldFetch":{"type":"JSFunction","value":"function() { \\n  console.log(\'should fetch.....\');\\n  return true; \\n}"}}]},"state":{"text":{"type":"JSExpression","value":"\\"outer\\""},"isShowDialog":{"type":"JSExpression","value":"false"}},"css":"body {\\n  font-size: 12px;\\n}\\n\\n.button {\\n  width: 100px;\\n  color: #ff00ff\\n}","lifeCycles":{"componentDidMount":{"type":"JSFunction","value":"function componentDidMount() {\\n  console.log(\'did mount\');\\n}"},"componentWillUnmount":{"type":"JSFunction","value":"function componentWillUnmount() {\\n  console.log(\'will unmount\');\\n}"}},"methods":{"testFunc":{"type":"JSFunction","value":"function testFunc() {\\n  console.log(\'test func\');\\n}"},"onClick":{"type":"JSFunction","value":"function onClick() {\\n  this.setState({\\n    isShowDialog: true\\n  });\\n}"},"closeDialog":{"type":"JSFunction","value":"function closeDialog() {\\n  this.setState({\\n    isShowDialog: false\\n  });\\n}"}},"originCode":"class LowcodeComponent extends Component {\\n  state = {\\n    \\"text\\":\\"outer\\",\\n    \\"isShowDialog\\":false\\n  }\\n  componentDidMount() {\\n    console.log(\'did mount\');\\n  }\\n  componentWillUnmount() {\\n    console.log(\'will unmount\');\\n  }\\n  testFunc() {\\n    console.log(\'test func\');\\n  }\\n  onClick() {\\n    this.setState({\\n      isShowDialog: true\\n    })\\n  }\\n  closeDialog() {\\n    this.setState({\\n      isShowDialog: false\\n    })\\n  }\\n}","hidden":false,"title":"页面","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"FormContainer","id":"node_oclcdgs7nr1","props":{"cols":2},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":"","children":[{"componentName":"FieldInput","id":"1679317879801118720","props":{"title":"单行文本111","placeholder":"请输入","description":"","status":"1","format":1,"defaultValue":{"valueType":"1","value":""}},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""},{"componentName":"FieldTextarea","id":"1679317879847256064","props":{"title":"多行文本22","placeholder":"请输入","description":"","status":"1","format":1,"defaultValue":{"valueType":"1","value":""}},"hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""}]}]}],"i18n":{}}',
    isDelete: false,
    dbTableName: 'b_lglo8rhp_0018',
    resourceType: 'TABLE',
    applicationId: '1681786472749',
    createTime: '2023-07-13T02:32:22.108+0000',
    updateTime: '2023-07-13T02:32:37.223+0000',
    extraParam: null,
    parentId: null,
    previousId: null,
  },
};

export interface IAppProps {}

const testData = observable({
  operateCode: [],
  dataCodeIds: [],
  fieldPerm: {
    viewFiledIds: [],
    editFiledIds: [],
  },
});

const Demo: FC<IAppProps> = (props) => {
  const data = useSelector(testData, {});

  const handleClick = () => {
    const newValue: any = [...data.fieldPerm.editFiledIds];
    newValue.push(Math.random().toString());
    testData.fieldPerm.editFiledIds.set(newValue);
  };

  const handleRemove = () => {
    let newValue: any = [...data.fieldPerm.editFiledIds];
    newValue = _.without(newValue, newValue[newValue.length - 1]);
    testData.fieldPerm.editFiledIds.set(newValue);
  };
  console.log('q=>render');
  return (
    <div>
      {/*<Button onClick={handleClick}>add</Button>*/}
      {/*<Button onClick={handleRemove}>remove</Button>*/}
      {/*{JSON.stringify(data.fieldPerm.editFiledIds)}*/}

      {/* <Table /> */}
      {/* <Formula label='test' /> */}
      <QueryBuilder tableConfig={d.data as any} />
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {/*<DataState />*/}
    </div>
  );
};

export interface IDemo2Props {}

export const Demo2: FC<IDemo2Props> = (props) => {
  const [data, setDataObservable] = usePermSelectSelector((s) => [s.data, s.setDataObservable]);

  const handleClick = () => {
    let viewFiledIds = data.fieldPerm.editFiledIds;
    // const newValue: any = [...data.fieldPerm.editFiledIds];
    // viewFiledIds.push(Math.random().toString());
    // let test = { ...data.fieldPerm.test };
    // test.first = Math.random().toString();
    setDataObservable((draft) => {
      // draft.fieldPerm.editFiledIds.push(Math.random().toString());
      // draft.fieldPerm.editFiledIds.set([...viewFiledIds]);
      // draft.fieldPerm.test.assign({ first: Math.random().toString() });
      // draft.fieldPerm.test.first.set(Math.random().toString());
    });
    // testData.fieldPerm.editFiledIds.set(newValue);
  };

  const handleRemove = () => {
    let newValue: any = data.fieldPerm.editFiledIds;
    newValue = _.without(newValue, newValue[newValue.length - 1]);
    // testData.fieldPerm.editFiledIds.set(newValue);
    setDataObservable((draft) => {
      draft.fieldPerm.editFiledIds.set(newValue);
      // draft.fieldPerm.editFiledIds(Math.random().toString());
    });
  };
  console.log('q=>render');
  return (
    <div>
      <Button onClick={handleClick}>add</Button>
      <Button onClick={handleRemove}>remove</Button>
      {JSON.stringify(data.fieldPerm.editFiledIds)}
    </div>
  );
};

export default () => {
  return (
    <PermSelectProvider resourceEntity={{} as any}>
      <Demo />
      {/*<Demo2 />*/}
    </PermSelectProvider>
  );
};
