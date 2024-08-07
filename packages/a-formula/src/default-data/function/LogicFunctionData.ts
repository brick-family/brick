import { IFunctionData } from '../../types';

/**
 * 逻辑函数
 */
export const LoginFunctionData: IFunctionData[] = [
  {
    id: 'NUMBERCOMP',
    name: 'NUMBERCOMP',
    type: '逻辑函数',
    info: '<p>数值组件与数值组件2比较，大于返回1，等于返回0，小于返回-1</p><p>例1：NUMBERCOMP(3,6)<br/></p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'object',
    param: false,
  },
  {
    id: 'EQ',
    name: 'EQ',
    type: '逻辑函数',
    info: '<p>两个参数比较，相同返回 true，默认忽略大小写，若不忽略，则填写第三个参数true</p><p>例：EQ(&quot;aaa&quot;,&quot;bbb&quot;)<br/></p><p>结果：false</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'IF',
    name: 'IF',
    type: '逻辑函数',
    info: '<p>判断参数1是否为真；如果为真返回参数2，如果为假则返回数值3</p><p>例1：IF(EQ(&quot;aaa&quot;,&quot;aab&quot;),&quot;bbb&quot;,&quot;ccc&quot;)<br/></p><p>结果：ccc</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'object',
    param: false,
  },
  {
    id: 'ISEMPTY',
    name: 'ISEMPTY',
    type: '逻辑函数',
    info: '<p>判断参数是否为空；如果为空，则返回 true；如果不为空则返回 false</p><p>例1：ISEMPTY(&quot;ddd&quot;)<br/></p><p>结果：true</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'NE',
    name: 'NE',
    type: '逻辑函数',
    info: '<p>两个参数比较，不相同返回 true，默认忽略大小写，若不忽略，则填写第三个参数true</p><p>例：NE(&quot;aaa&quot;,&quot;bbb&quot;)<br/></p><p>结果：true</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'LT',
    name: 'LT',
    type: '逻辑函数',
    info: '<p>比较两参数值大小，参数1小于参数2返回 true</p><p>例1：LT(5,7)</p><p>结果：true</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'GT',
    name: 'GT',
    type: '逻辑函数',
    info: '<p>比较两参数值大小，参数1大于参数2返回 true</p><p>例1：GT(5,7)</p><p>结果：false</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'LE',
    name: 'LE',
    type: '逻辑函数',
    info: '<p>比较两参数值大小，参数1小于等于参数2返回 true</p><p>例1：LE(5,5)</p><p>结果：true</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'GE',
    name: 'GE',
    type: '逻辑函数',
    info: '<p>比较两参数值大小，参数1大于等于参数2返回 true</p><p>例1：GE(8,5)</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'AND',
    name: 'AND',
    type: '逻辑函数',
    info: '<p>当参数组中的所有参数逻辑值为 true 时（逗号隔开的逻辑式子都满足），才返回 true，当参数组中的任何一个参数逻辑值为 false 时，就会返回false。</p><p>例1：AND(true,EQ(&quot;aa&quot;,&quot;aa&quot;),LT(3,5))</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'OR',
    name: 'OR',
    type: '逻辑函数',
    info: '<p>在参数组中，任何一个参数逻辑值为 true（逗号隔开的逻辑式子其中一项满足），即返回 true；只有当所有逻辑参数值为 false，才返回 false。</p><p>例1：OR(true,EQ(&quot;aa&quot;,&quot;ccc&quot;),LT(3,5))</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'NOT',
    name: 'NOT',
    type: '逻辑函数',
    info: '<p>对参数逻辑值求反。参数若为 true 则变成 false，参数若为 false 则变为 true。</p><p>例1：OR(true)</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'ISVALIDINTEGER',
    name: 'ISVALIDINTEGER',
    type: '逻辑函数',
    info: '<p>判断参数是否为数字。</p><p>例1：ISVALIDINTEGER(&quot;bbb&quot;)</p><p>注意：<span style="color: rgb(255, 0, 0);">也可用于判断数字类型字段是否为空</span></p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'ISNOTEMPTY',
    name: 'ISNOTEMPTY',
    type: '逻辑函数',
    info: '<p>判断字符类型参数是否不为空，为空返回false，不为空返回true。</p><p>例1：ISNOTEMPTY(&quot;bbb&quot;)</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'DENGYU',
    name: 'DENGYU',
    type: '逻辑函数',
    info: '<p>判断两数值类型参数是否相等。</p><p>例1：DENGYU(4,5)</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
  {
    id: 'ISNUMBER',
    name: 'ISNUMBER',
    type: '逻辑函数',
    info: '<p>判断参数是否为数字类型。</p><p>例1：ISNUMBER(&quot;bbb&quot;)</p>',
    enableCache: true,
    reqCont: 0,
    jvsParamType: 'bool',
    param: false,
  },
];
