import { IFunctionData } from '../../types';

export const NumberFunctionData: IFunctionData[] = [
  {
    id: 'CONVERTDIGIT',
    name: 'CONVERTDIGIT',
    type: '数字函数',
    info: '<p>将金钱数转换为人民币大写形式。</p><p>例1：CONVERTDIGIT(7888.65)<br/>结果：肆万捌仟陆佰肆拾捌元伍角陆分</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'text',
    param: false,
  },
  {
    id: 'CONVERTINT',
    name: 'CONVERTINT',
    type: '数字函数',
    info: '<p>将字符串转换为整型(整数)<br/>例：CONVERTINT(&#39;1356456&#39;)<br/></p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'number',
    param: false,
  },
  {
    id: 'CONVERTDOUBLE',
    name: 'CONVERTDOUBLE',
    type: '数字函数',
    info: '<p>将字符串转换为浮点类型（小数）<br/>例：CONVERTDOUBLE(&#39;135.1324&#39;)<br/></p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'number',
    param: false,
  },
  {
    id: 'ISDECIMAL',
    name: 'ISDECIMAL',
    type: '数字函数',
    info: '判断当前数据是否是小数',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
];
