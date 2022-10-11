
import { ComponentMetadata, Snippet } from '@alilc/lowcode-types';

const FieldInputMeta: ComponentMetadata = {
  "componentName": "FieldInput",
  "title": "FieldInput",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "npm": {
    "package": "contain-ui-material",
    "version": "0.1.3",
    "exportName": "FieldInput",
    "main": "src/index.tsx",
    "destructuring": true,
    "subName": ""
  },
  "configure": {
    "props": [
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "title",
            "zh-CN": "标题"
          },
          "tip": "属性：title"
        },
        "name": "title",
        "description": "标题11",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": "单行文本"
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "占位提示",
            "zh-CN": "占位提示"
          },
          "tip": "属性：placeholder"
        },
        "name": "placeholder",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": "请输入"
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "description",
            "zh-CN": "描述"
          },
          "tip": "属性：description"
        },
        "name": "description",
        "description": "描述",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": false,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "status",
            "zh-CN": "状态"
          }
        },
        "name": "status",
        "setter": {
          "componentName": "RadioGroupSetter",
          "props": {
            "options": [{
              "label": "普通",
              "value": "normal"
            }, {
              "label": "禁用",
              "value": "disable"
            }, {
              "label": "只读",
              "value": "readonly"
            }]
          },
          "isRequired": true,
          "initialValue": "normal"
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "isRequired",
            "zh-CN": "校验"
          },
        },
        type: 'group',
        name: "valid",
        description: "校验",
        display: 'accordion',
        items: [{
          "title": {
            "label": {
              "type": "i18n",
              "en-US": "isRequired",
              "zh-CN": "是否必填"
            },
            "tip": "isRequired | 是否必填"
          },
          "name": "isRequired",
          "description": "是否必填",
          "setter": {
            componentName: 'MixedSetter',
            props: {
              setters: ['StringSetter', 'SlotSetter'],
            },
          }
        }, {
          name: 'name',
          title: {
            label: {
              type: 'i18n',
              zh_CN: '表单标识',
              en_US: 'Name',
            },
            tip: {
              type: 'i18n',
              zh_CN: '属性: name | 说明: 表单标识',
              en_US: 'prop: name | description: switch name',
            },
          },
          setter: 'StringSetter',
        },]

      }
    ],
    "supports": {
      "style": true
    },
    "component": {}
  }
};
const snippets: Snippet[] = [
  {
    "title": "FieldInput",
    "screenshot": "",
    "schema": {
      "componentName": "FieldInput",
      "props": {}
    }
  }
];

export default {
  ...FieldInputMeta,
  snippets
};
