export const defaultSchema = {
  version: '1.0.0',
  componentsMap: [
    {
      package: 'contain-ui-material',
      version: '0.1.12',
      exportName: 'FieldInput',
      main: 'src/index.ts',
      destructuring: true,
      subName: '',
      componentName: 'FieldInput',
    },
    {
      package: 'contain-ui-material',
      version: '0.1.12',
      exportName: 'FormContainer',
      main: 'src/index.ts',
      destructuring: true,
      subName: '',
      componentName: 'FormContainer',
    },
    {
      devMode: 'lowCode',
      componentName: 'Page',
    },
  ],
  componentsTree: [
    {
      componentName: 'Page',
      id: 'node_dockcviv8fo1',
      props: {
        ref: 'outerView',
        style: {
          height: '100%',
        },
      },
      fileName: '/',
      dataSource: {
        list: [
          {
            type: 'fetch',
            isInit: true,
            options: {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
            },
            id: 'info',
            shouldFetch: {
              type: 'JSFunction',
              value: "function() { \n  console.log('should fetch.....');\n  return true; \n}",
            },
          },
        ],
      },
      state: {
        text: {
          type: 'JSExpression',
          value: '"outer"',
        },
        isShowDialog: {
          type: 'JSExpression',
          value: 'false',
        },
      },
      css: 'body {\n  font-size: 12px;\n}\n\n.button {\n  width: 100px;\n  color: #ff00ff\n}',
      lifeCycles: {
        componentDidMount: {
          type: 'JSFunction',
          value: "function componentDidMount() {\n  console.log('did mount');\n}",
        },
        componentWillUnmount: {
          type: 'JSFunction',
          value: "function componentWillUnmount() {\n  console.log('will unmount');\n}",
        },
      },
      methods: {
        testFunc: {
          type: 'JSFunction',
          value: "function testFunc() {\n  console.log('test func');\n}",
        },
        onClick: {
          type: 'JSFunction',
          value: 'function onClick() {\n  this.setState({\n    isShowDialog: true\n  });\n}',
        },
        closeDialog: {
          type: 'JSFunction',
          value: 'function closeDialog() {\n  this.setState({\n    isShowDialog: false\n  });\n}',
        },
      },
      originCode:
        'class LowcodeComponent extends Component {\n  state = {\n    "text": "outer",\n    "isShowDialog": false\n  }\n  componentDidMount() {\n    console.log(\'did mount\');\n  }\n  componentWillUnmount() {\n    console.log(\'will unmount\');\n  }\n  testFunc() {\n    console.log(\'test func\');\n  }\n  onClick() {\n    this.setState({\n      isShowDialog: true\n    })\n  }\n  closeDialog() {\n    this.setState({\n      isShowDialog: false\n    })\n  }\n}',
      hidden: false,
      title: '页面',
      isLocked: false,
      condition: true,
      conditionGroup: '',
      children: [
        {
          componentName: 'FormContainer',
          id: 'node_oclcdgs7nr1',
          props: {
            cols: 2,
          },
          hidden: false,
          title: '',
          isLocked: false,
          condition: true,
          conditionGroup: '',
          children: [],
        },
      ],
    },
  ],
  i18n: {},
};
