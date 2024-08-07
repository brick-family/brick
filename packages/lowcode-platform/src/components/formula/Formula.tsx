import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/cobalt.css';
import s from './formula.less';
import { Collapse } from 'antd';
import { getLabeType } from './util';
import { ITableEntity } from '@brick/types';

const { Panel } = Collapse;

export interface IFormulaProps {
  // 标签名
  label: string;
}

const currentData = null;
// {
//   "id": "SUM",
//   "name": "SUM",
//   "type": "数学函数",
//   "info": "这是一个数学函数",
//   "enableCache": true,
//   "reqCont": 0,
//   "jvsParamType": "number",
//   "param": false
// };

const data = [
  {
    title: '参数列表',
    type: 'tree',
    data: [
      {
        title: '表单字段',
        data: [
          {
            id: 'id',
            name: '数据id',
            info: 'id  数据id\n单行文本',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
        ],
      },
      {
        title: '系统参数',
        data: [
          {
            id: 'SYSuserId',
            name: '用户id',
            info: '当前用户的id',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSRealName',
            name: '用户昵称',
            info: '当前用户的昵称',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSAccountName',
            name: '用户帐号名',
            info: '当前用户的帐号名',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSPhone',
            name: '用户手机号',
            info: '当前用户的手机号',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSEmail',
            name: '用户邮箱',
            info: '当前用户的邮箱',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSHeadImg',
            name: '用户头像',
            info: '当前用户的头像图片链接',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSDeptId',
            name: '用户部门ID',
            info: '当前用户所在的部门ID',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSUserEmployeeNo',
            name: '用户职工编号',
            info: '当前用户职工编号',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSUserRole',
            name: '用户角色',
            info: '当前用户角色',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'array',
            param: true,
          },
          {
            id: 'SYSDeptName',
            name: '用户部门名称',
            info: '当前用户所在的部门名称',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
          {
            id: 'SYSDeptCode',
            name: '用户部门编码',
            info: '当前用户所在的部门编码',
            enableCache: false,
            reqCont: 0,
            jvsParamType: 'text',
            param: true,
          },
        ],
      },
    ],
  },
  {
    title: '函数列表',
    type: 'tree',
    data: [
      {
        title: '基础函数 - 数学函数',
        data: [
          {
            id: 'SUM',
            name: 'SUM',
            type: '数学函数',
            info: '这是一个数学函数',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'ADD',
            name: 'ADD',
            type: '数学函数',
            info: '<p>加法运算或正号<br/>例：ADD(5,6,7)<br/>注意：参数可以是多个数字</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'SUB',
            name: 'SUB',
            type: '数学函数',
            info: '<p>第一个数值减去第二个数值</p><p>例：SUBTRACT(20,6)<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'MULTIPLY',
            name: 'MULTIPLY',
            type: '数学函数',
            info: '<p>多个数值相乘</p><p>例：MULTIPLY(7,6,9,3)<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'DIVIDE',
            name: 'DIVIDE',
            type: '数学函数',
            info: '<p>第一个数值除以第二个数值<br/></p><p>例：DIVIDE(7,6)<br/></p><p>注意：第二个数值不能为0</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'AVERAGE',
            name: 'AVERAGE',
            type: '数学函数',
            info: '<p>求多个数值的平均值</p><p>例：AVERAGE(7,8,6,2)<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'MAX',
            name: 'MAX',
            type: '数学函数',
            info: '<p>返回一组数字中的最大值</p><p>例：MAX(7,8,9,6,5,4,7)</p><p>结果：9</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'MIN',
            name: 'MIN',
            type: '数学函数',
            info: '<p>返回最小的数值</p><p>例：MIN(7,8,9,6,5,4,7)</p><p>结果：4</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'ABS',
            name: 'ABS',
            type: '数学函数',
            info: '当数值为负数的时候返回他的绝对值数值',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'ROUND',
            name: 'ROUND',
            type: '数学函数',
            info: '<p>将数值四舍五入到整数位。<br/>例：ROUND(4.56221)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'CEILING',
            name: 'CEILING',
            type: '数学函数',
            info: '<p>返回将参数向上舍入（沿绝对值增大的方向）为最接近的指定基数的倍数。</p><p>例：CEILING(4.56221,2)<br/>结果为：10</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'INTNUM',
            name: 'INTNUM',
            type: '数学函数',
            info: '<p>把数值组件的值向下舍入为整数</p><p>例：INTNUM(4.56221,2)<br/>结果为：4</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'LOG',
            name: 'LOG',
            type: '数学函数',
            info: '<p>根据指定底数返回数字的对数</p><p>例：LOG(4,2)<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'MOD',
            name: 'MOD',
            type: '数学函数',
            info: '<p>返回2个数值相除的余数</p><p>例：MOD(4,2)<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'POWER',
            name: 'POWER',
            type: '数学函数',
            info: '<p>计算出数值组件乘幂的值</p><p>例：POWER(4,2)<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'FIXED',
            name: 'FIXED',
            type: '数学函数',
            info: '<p>将数值1四舍五入到指定的小数位数</p><p>例：FIXED(4.5468,2)<br/></p><p>结果：4.55</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'SQRT',
            name: 'SQRT',
            type: '数学函数',
            info: '<p>取参数的平方根</p><p>例：SQRT(9)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'PRODUCT',
            name: 'PRODUCT',
            type: '数学函数',
            info: '数字相乘',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'SUMPRODUCT',
            name: 'SUMPRODUCT',
            type: '数学函数',
            info: '<p>在两数值中，若其中存在数组，先将数组自身的元素相乘，返回两数值之和</p><p>例1：SUMPRODUCT([2,2,3],[1,2,3])<br/>结果：18</p><p>例2：SUMPRODUCT([2,2,3],2)</p><p>结果：14</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'FLOOR',
            name: 'FLOOR',
            type: '数学函数',
            info: '<p>将参数1向下舍入（沿绝对值减小的方向）为最接近的参数1的倍数。</p><p>例1：FLOOR(4.76,2)<br/>结果：8<br/>例2：FLOOR(-4.76,2)<br/>结果：-10</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'DECIMALFORMAT',
            name: 'DECIMALFORMAT',
            type: '数学函数',
            info: '<p>格式化带有小数的数字</p><p>第一个参数为要格式化的数字；<br/></p><p>第二个参数为格式：<br/></p><p style="text-indent: 2em;">格式中主要以 # 和 0 两种占位符号来指定数字长度。0 表示如果位数不足则以 0 填充，# 表示只要有可能就把数字拉上这个位置。<br/></p><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li><p style="text-indent: 0em;">0 ------ 取一位整数</p></li><li><p style="text-indent: 0em;">0.00 <span style="text-indent: 32px;">------</span> 取一位整数和两位小数</p></li><li><p style="text-indent: 0em;">00.000 <span style="text-indent: 32px;">------</span> 取两位整数和三位小数</p></li><li><p style="text-indent: 0em;"># <span style="text-indent: 32px;">------</span> 取所有整数部分</p></li><li><p style="text-indent: 0em;">#.##% <span style="text-indent: 32px;">------</span> 以百分比方式计数，并取两位小数</p></li><li><p style="text-indent: 0em;">#.#####E0 <span style="text-indent: 32px;">------</span> 显示为科学计数法，并取五位小数</p></li><li><p style="text-indent: 0em;">,### <span style="text-indent: 32px;">------</span> 每三位以逗号进行分隔，例如：299,792,458</p></li><li><p style="text-indent: 0em;">光速大小为每秒,###米 <span style="text-indent: 32px;">------</span> 将格式嵌入文本</p></li></ul><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
        ],
      },
      {
        title: '基础函数 - 文字函数',
        data: [
          {
            id: 'CONTRACT',
            name: 'CONTRACT',
            type: '文字函数',
            info: '<p>这是一个文字函数，将多个文字组合起来，参数可使用多个</p><p>例如：CONTRACT(&quot;aa&quot;,&quot;bb&quot;,&quot;cc&quot;)</p><p>结果为： aabbcc</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'CONCATENAT',
            name: 'CONCATENAT',
            type: '文字函数',
            info: '<p>使用自定义连接符拼接多个字符串</p><p>例：CONCATENAT(&quot;-&quot;,&quot;aaa&quot;,&quot;bbb&quot;,&quot;ccc&quot;)<br/>注意：需要拼接的字符串至少为2个</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'LEFT',
            name: 'LEFT',
            type: '文字函数',
            info: '<p>从一个文本字符串的第一个字符开始返回指定个数的字符,如果文本长度小于自定字符个数，就将原始文本返回</p><p>例：LEFT(&quot;aaaaaaa&quot;,5)<br/><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'RIGHT',
            name: 'RIGHT',
            type: '文字函数',
            info: '<p>从一个文本字符串的最后一个字符开始返回指定个数的字符,如果文本长度小于自定字符个数，就将原始文本返回</p><p>例：RIGHT(&quot;aaaaaaa&quot;,5)<br/><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'LOWER',
            name: 'LOWER',
            type: '文字函数',
            info: '<p>将一个文本字符串中的所有大写字母转换为小写字母</p><p>例：LOWER(&quot;AAaaaa&quot;)<br/><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'UPPER',
            name: 'UPPER',
            type: '文字函数',
            info: '<p>将一个文本字符串中的所有小写字母转换为大写字母</p><p>例：UPPER(&quot;AAaaaa&quot;)<br/><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'REPLACE',
            name: 'REPLACE',
            type: '文字函数',
            info: '<p>替换参数1中的字符串，替换字符数为参数2，替换的内容为参数3。<br/>例1：REPLACE(&quot;aaabbbccc&quot;,&quot;ddd&quot;,&quot;bbb&quot;,)，<br/>结果为：aaadddccc</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'LEN',
            name: 'LEN',
            type: '文字函数',
            info: '<p>返回字符串中的字符个数</p><p>例：LEN(&quot;aaggsc&quot;)。</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'REPT',
            name: 'REPT',
            type: '文字函数',
            info: '<p>将文本重复指定次数</p><p>例：REPT(&quot;aaggsc&quot;,3)。</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'SEARCH',
            name: 'SEARCH',
            type: '文字函数',
            info: '<p>在第一个文本字符串中查找第二个文本字符串，并返回第一个文本字符串的起始位置的编号，该编号从第二个文本字符串的第一个字符算起。</p><p>例：SEARCH(&#39;vvsssddaaccaa&#39;,&quot;aa&quot;)</p><p>注意：返回 0 则表示未查找到。默认从第一个字符开始查找，如果需要从指定字符开始查找，填写第三个参数，表示从第几个字符开始查找。例如：SEARCH(&quot;aa&quot;,&#39;vvsssddaaccaa&#39;,5)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'MID',
            name: 'MID',
            type: '文字函数',
            info: '<p>截取<strong>参数1</strong>字符串，从<strong>参数2</strong>[数值]开始截取，截取<strong>参数3</strong>[数值]个字符。</p><p>例：MID(&quot;vvsssddaaccaa&quot;,3,4)<br/>结果为：sssd</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
        ],
      },
      {
        title: '基础函数 - 逻辑函数',
        data: [
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
        ],
      },
      {
        title: '基础函数 - 集合函数',
        data: [
          {
            id: 'INTERSECTI',
            name: 'INTERSECTI',
            type: '集合函数',
            info: '<p>计算两个集合的交集</p><p>例1：INTERSECTIONSET([5,6,7,7],[4,4,3,2,5,7])</p><p>结果：[5, 7]</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'UNIONSET',
            name: 'UNIONSET',
            type: '集合函数',
            info: '<p>计算两个集合的并集</p><p>例1：UNIONSET([5,6,7,7],[4,4,3,2,5,7])</p><p>结果：[5, 6, 7, 4, 3, 2]</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'DIFFERENCE',
            name: 'DIFFERENCE',
            type: '集合函数',
            info: '<p>计算两个集合的差集</p><p>例1：DIFFERENCE([5,6,7,7],[4,4,3,2,5,7])</p><p>结果：[6, 4, 3, 2]</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'SUBSET',
            name: 'SUBSET',
            type: '集合函数',
            info: '<p>计算第二个集合是否第一个集合的子集</p><p>例1：SUBSET([4,4,3,2,5,7],[4,3])</p><p>结果：true</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'bool',
            param: false,
          },
          {
            id: 'ARRAYGET',
            name: 'ARRAYGET',
            type: '集合函数',
            info: '<p>返回数据集中第几个值</p><p>例1：ARRAYGET([4,4,3,2,5,7],5)</p><p>结果：5</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'LARGE',
            name: 'LARGE',
            type: '集合函数',
            info: '<p>返回集合中第几大的值</p><p>例1：ARRAYGET([4,4,3,2,5,7],2)</p><p>结果：5</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'SMALL',
            name: 'SMALL',
            type: '集合函数',
            info: '<p>返回数据集中第几个最小值。</p><p>例1：SMALL([4,4,3,2,5,7],2)</p><p>结果：3<br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'LISTADDALL',
            name: 'LISTADDALL',
            type: '集合函数',
            info: '<p>将所有参数组合为一个集合返回。</p><p>例1：LISTADDALL(4,5,&quot;aaa&quot;,2,52,5)</p><p>结果：[4, 5, aaa, 2, 52, 5]</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'LISTGET',
            name: 'LISTGET',
            type: '集合函数',
            info: '<p>获取集合中指定索引位置的元素。</p><p>例1：LISTGET([4, 5, &quot;aaa&quot;, 2, 52, 5],3)&quot;;</p><p>结果：2</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'LISTADD',
            name: 'LISTADD',
            type: '集合函数',
            info: '<p>向集合中添加多个元素。</p><p>例1：LISTADD([4, 5, &quot;aaa&quot;, 2, 52, 5],&quot;bbb&quot;)</p><p>结果：[4, 5, aaa, 2, 52, 5, bbb]</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'LISTRANDOM',
            name: 'LISTRANDOM',
            type: '集合函数',
            info: '<p>随机取集合中的某一元素。</p><p>例1：LISTRANDOM([4, 5, &quot;aaa&quot;, 2, 52, 5])</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'CONTAIN',
            name: 'CONTAIN',
            type: '集合函数',
            info: '<p>返回参数一集合中是否包含参数二，包含返回true，不包含返回false。</p><p>例1：CONTAIN([&quot;bbb&quot;,4,5,6,7],&quot;aa&quot;)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'bool',
            param: false,
          },
          {
            id: 'LISTSUM',
            name: 'LISTSUM',
            type: '集合函数',
            info: '<p>返回集合中所有元素的累加和。</p><p>例1：LISTSUM([4,5,6,7])</p><p>结果：22<br/>注意：可用于<strong><span style="color: rgb(255, 0, 0);">表格中某列数据</span></strong>汇总求和运算。</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'OBJLISTSUM',
            name: 'OBJLISTSUM',
            type: '集合函数',
            info: '<p>返回参数1[对象数组]中对象的【某个属性】的累加和。</p><p>例:OBJLISTSUM([obj1,obj2,obj3],&#39;金额&#39;)。</p><p>注意：第一个参数为对象数组；第二个参数为对象中要汇总计算的属性名，用双引号包围。</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'ARRAYJOIN',
            name: 'ARRAYJOIN',
            type: '集合函数',
            info: '<p>使用间隔符将一个字符串数组连接，转为字符串</p><p>例：ARRAYJOIN(String[],&quot;-&quot;)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'ARRAYINDEXOF',
            name: 'ARRAYINDEXOF',
            type: '集合函数',
            info: '返回集合中指定元素所在位置',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
        ],
      },
      {
        title: '基础函数 - 时间函数',
        data: [
          {
            id: 'NOW',
            name: 'NOW',
            type: '时间函数',
            info: '<p>返回当前时间，格式为年-月-日 时-分-秒。</p><p>例1：NOW()</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'TIMEFORMAT',
            name: 'TIMEFORMAT',
            type: '时间函数',
            info: '<p>将时间戳转换为指定日期格式。</p><p>例1：TIMEFORMAT(&#39;2022-09-16 16:20:33&#39;,&#39;yyyy-MM-dd&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'GETYEAR',
            name: 'GETYEAR',
            type: '时间函数',
            info: '<p>获取指定时间的年份。</p><p>例1：GETYEAR(&#39;2022-09-16 16:20:33&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'GETMONTH',
            name: 'GETMONTH',
            type: '时间函数',
            info: '<p>获取指定时间的月份。</p><p>例1：GETMONTH(&#39;2022-09-16 16:20:33&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'GETDATE',
            name: 'GETDATE',
            type: '时间函数',
            info: '<p>获取指定时间的天数，这个月的第几天。</p><p>例1：GETDATE(&#39;2022-09-16 16:20:33&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'GETWEEKDAY',
            name: 'GETWEEKDAY',
            type: '时间函数',
            info: '<p>获取指定时间的星期几。</p><p>例1：GETWEEKDAY(&#39;2022-09-16 16:20:33&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'COMPARETIME',
            name: 'COMPARETIME',
            type: '时间函数',
            info: '<p>比较两个时间的大小，<strong>日期参数1</strong>大于<strong>日期参数2</strong>返回 true，否则返回 false。</p><p>例1：COMPARETIME(&#39;2022-09-16 16:20:33&#39;,&#39;2022-09-12 19:20:33&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'bool',
            param: false,
          },
          {
            id: 'TIMEBETWEEN',
            name: 'TIMEBETWEEN',
            type: '时间函数',
            info: '<p>返回两个日期之间相差的天、月、年、小时等。</p><p>第三个参数使用不同的参数返回同的相差类型：<br/>天（DAYS）、<br/>周（WEEKS）、<br/>月（MONTHS）、<br/>年（YEARS）、<br/>小时（HOURS）、<br/>分钟（MINUTES）、<br/>秒（SECONDS）。</p><p>例1：TIMEBETWEEN(&#39;2022-09-16 16:20:33&#39;,&#39;2022-09-12 19:20:33&#39;,&#39;DAYS&#39;)</p><p>结果：3<br/></p><p>例2：TIMEBETWEEN(&#39;2022-09-16 16:20:33&#39;,&#39;2022-09-12 19:20:33&#39;,&#39;HOURS&#39;)<br/>结果：93</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'GETCHINESEZODIAC',
            name: 'GETCHINESEZODIAC',
            type: '时间函数',
            info: '<p>根据身份证号自动计算生肖。</p><p>例如：GETCHINESEZODIAC(&#39;549874455212544412&#39;)。</p><p>注意：参数为字符串类型。</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'GETZODIAC',
            name: 'GETZODIAC',
            type: '时间函数',
            info: '<p>根据身份证号自动计算星座。</p><p>例如：GETZODIAC(&#39;549874455212544412&#39;)。</p><p>注意：参数为字符串类型</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'QUARTER',
            name: 'QUARTER',
            type: '时间函数',
            info: '<p>获取日期所在的季度。</p><p>例如：QUARTER(‘2022-09-15 12:34:23’)。</p><p>注意：返回的季度从1开始计数。</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
          {
            id: 'DAYOFFSET',
            name: 'DAYOFFSET',
            type: '时间函数',
            info: '<p>日期增加或减少指定天数。</p><p>例如：DAYOFFSET(‘2022-09-15 12:34:23’,20)。</p><p>注意：第二个参数为负数时未减少天数</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'COMPAREDATE',
            name: 'COMPAREDATE',
            type: '时间函数',
            info: '<p>比较两个日期的大小，<strong>日期参数1</strong>大于<strong>日期参数2</strong>返回 true，否则返回 false。</p><p>例1：COMPAREDATE(&#39;2022-09-16&#39;,&#39;2022-09-12&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'bool',
            param: false,
          },
          {
            id: 'DATEFORMAT',
            name: 'DATEFORMAT',
            type: '时间函数',
            info: '<p>将日期转换为指定日期格式。</p><p>例1\ufffd\ufffd\ufffdDATEFORMAT(&#39;2022-09-16&#39;,&#39;yyyy-MM-dd HH:mm:ss&#39;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'DATEPARSE',
            name: 'DATEPARSE',
            type: '时间函数',
            info: '<p>自动识别时间格式，将日期转换为指定日期格式。<br/>例1：DATEPARSE(&quot;2022-09-05T03:21:23.825Z&quot;,&quot;yyyy-MMM-dd&quot;)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'PARSETIMESTAMP',
            name: 'PARSETIMESTAMP',
            type: '时间函数',
            info: '<p>将时间戳转换为日期格式（yyyy-MM-dd HH:mm:ss）。<br/>例1：PARSETIMESTAMP(1675612800000)</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'AGEOFNOW',
            name: 'AGEOFNOW',
            type: '时间函数',
            info: '根据日期计算当前年龄',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'number',
            param: false,
          },
        ],
      },
      {
        title: '基础函数 - 对象函数',
        data: [
          {
            id: 'SETVALUE',
            name: 'SETVALUE',
            type: '对象函数',
            info: '<p>修改对象数据中指定属性的值；第二个参数为要修改的属性名，第三个参数为修改的值。</p><p>例1：SETVALUE(obj,&quot;id&quot;,&quot;20222156&quot;)<br/></p><p>注意：若属性不存在则，在数据中新增属性及值。</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'COPYPROPER',
            name: 'COPYPROPER',
            type: '对象函数',
            info: '拷贝第一个对象的属性值到第二个对象。（仅拷贝属性名相同的值）',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'text',
            param: false,
          },
          {
            id: 'GETVALUE',
            name: 'GETVALUE',
            type: '对象函数',
            info: '<p>获取对象数据中指定属性的值。</p><p>例1：GETVALUE(date1,&#39;danWei&#39;)&quot;;</p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
          {
            id: 'TOJSONOBJ',
            name: 'TOJSONOBJ',
            type: '对象函数',
            info: '<p>将json字符串转换为对象。</p><p>例1：TOJSONOBJ(&quot;{&quot;danWei&quot;:&quot;444&quot;,&quot;zongJia&quot;:555}&quot;)</p><p><br/></p>',
            enableCache: true,
            reqCont: 0,
            jvsParamType: 'object',
            param: false,
          },
        ],
      },
      {
        title: '基础函数 - 数字函数',
        data: [
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
        ],
      },
    ],
  },
];

interface IFunction {
  id: string;
  name: string;
  info: string;
}

interface IFormulaTables {
  title: string;
  data: ITableEntity[];
}

interface IFormulaFunction {
  title: string;
}

export const Formula123131: FC<IFormulaProps> = ({ label = '标签名称' }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const keyCodeRef = useRef<number>(-1);
  const coderRef = useRef<any>();

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }
    const defaultOptions = {
      mode: 'javasctipt', // 语言
      // 缩进格式
      tabSize: 2,
      // 主题，对应主题库 JS 需要提前引入
      theme: 'cobalt',
      // 显示行号
      lineNumbers: true,
      line: true,
    };

    coderRef.current = CodeMirror.fromTextArea(textareaRef.current, defaultOptions);
    // coder.setValue('${SUM}(${id})')
    const coder = coderRef.current;
    coder.on('change', (coder) => {
      // this.code = coder.getValue()
    });

    // 输入或粘贴时编辑触发
    coder.on('cursorActivity', (coder) => {
      console.log('q=>121');
      let pos = coder.getCursor();
      let lineCon = coder.getLine(pos.line);
      let reg =
        /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2022\u2028\u2029\ufeff\ufff9-\ufffc]/g;
      let charStr = lineCon.charAt(pos.ch);
      console.log(lineCon.length, '-------', pos.ch, charStr);
      if (pos.ch < lineCon.length) {
        // 获取光标位置处的内容，判断是否为变量函数，找到起始位置，移动光标至起点前一位
        // 特殊字符  /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2022\u2028\u2029\ufeff\ufff9-\ufffc]/g.test()
        if (reg.test(charStr) || /[\0]/g.test(charStr)) {
          let lastOne = lineCon.charAt(pos.ch - 1);
          console.log(lastOne);
          // 前一位不是空格
          if (lastOne && !reg.test(lastOne) && /[\0]/g.test(lastOne) == false) {
            // 前一位是 }
            if (lastOne == '}') {
              // }\0\0
              if (
                reg.test(lineCon.charAt(pos.ch + 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch + 1))
              ) {
                if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                  coder.moveH(1, 'char');
                }
                if (keyCodeRef.current == 37) {
                  let opEnd = pos.ch - 1;
                  for (let whCount = opEnd; whCount >= 0; whCount--) {
                    if (lineCon[whCount] == '$') {
                      coder.moveH(-1, 'char');
                      break;
                    }
                    coder.moveH(-1, 'char');
                  }
                  coder.moveH(-1, 'char'); // 左侧\0
                }
              }
              // }\0(
              else if (lineCon.charAt(pos.ch + 1) == '(') {
                if (keyCodeRef.current !== 37) {
                  coder.moveH(1, 'char');
                  coder.moveH(1, 'char');
                }
              } else {
                if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                  coder.moveH(1, 'char');
                }
                if (keyCodeRef.current == 37) {
                  let opEnd = pos.ch - 1;
                  for (let whCount = opEnd; whCount >= 0; whCount--) {
                    if (lineCon[whCount] == '$') {
                      coder.moveH(-1, 'char');
                      break;
                    }
                    coder.moveH(-1, 'char');
                  }
                  coder.moveH(-1, 'char'); // 左侧\0
                }
              }
            }
            // ${}\0(\0\0)
            if (lastOne == '(') {
              if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                coder.moveH(1, 'char');
              }
              if (keyCodeRef.current == 37) {
                coder.moveH(-1, 'char');
                let opEnd = pos.ch - 1;
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    coder.moveH(-1, 'char');
                    break;
                  }
                  coder.moveH(-1, 'char');
                }
              }
            }
            // )\0
            if (lastOne == ')') {
              if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                if (
                  (reg.test(lineCon[pos.ch - 2]) || /\0/g.test(lineCon[pos.ch - 2])) &&
                  lineCon[pos.ch - 3] == ')'
                ) {
                  coder.moveH(-1, 'char');
                } else if (
                  (reg.test(lineCon[pos.ch + 1]) || /\0/g.test(lineCon[pos.ch + 1])) &&
                  lineCon[pos.ch + 2] == ')'
                ) {
                  coder.moveH(1, 'char');
                } else {
                  coder.moveH(1, 'char');
                }
                if (keyCodeRef.current == 39) {
                  coder.moveH(1, 'char');
                }
              }
              if (keyCodeRef.current == 37) {
                let opEnd = pos.ch - 1;
                if (reg.test(lineCon[opEnd - 1]) || /[\0]/g.test(lineCon[opEnd - 1])) {
                  if (
                    (reg.test(lineCon[opEnd - 2]) || /[\0]/g.test(lineCon[opEnd - 2])) &&
                    lineCon[opEnd - 3] == ')'
                  ) {
                    coder.moveH(-1, 'char');
                    coder.moveH(-1, 'char');
                  }
                } else {
                  let hasLeft = false;
                  let moveCount = -1;
                  for (let whCount = opEnd; whCount >= 0; whCount--) {
                    if (lineCon[whCount] == '(') {
                      hasLeft = true;
                    }
                    if (lineCon[whCount] == '$') {
                      moveCount += 1;
                      break;
                    }
                    moveCount += 1;
                  }
                  if (hasLeft) {
                    if (moveCount > -1) {
                      for (let mc = 0; mc < moveCount; mc++) {
                        coder.moveH(-1, 'char');
                      }
                    }
                  } else {
                    coder.moveH(-1, 'char');
                    coder.moveH(-1, 'char');
                  }
                }
              }
            }
          }
        } else {
          // 函数名  或  变量名
          if (charStr && ['$', '{', '}', '(', ')'].indexOf(charStr) == -1) {
            let left = -1;
            let right = -1;
            let alexLeft = pos.ch - 1; // 左边计数起点
            let alexRight = pos.ch + 1; // 右边计数终点
            if (alexLeft > -1) {
              for (let whCount = alexLeft; whCount >= 0; whCount--) {
                // 排除手写字符
                if (lineCon[whCount] == '}') {
                  left = -1;
                  break;
                }
                if (lineCon[whCount] == '$' && lineCon[whCount + 1] == '{') {
                  left = whCount;
                  break;
                }
              }
            }
            if (alexRight > -1) {
              for (let rCount = alexRight; rCount < lineCon.length; rCount++) {
                // 排除手写字符
                if (lineCon[rCount] == '$') {
                  right = -1;
                  break;
                }
                if (lineCon[rCount] == '}') {
                  // 函数
                  if (
                    (reg.test(lineCon[rCount + 1]) || /[\0]/g.test(lineCon[rCount + 1])) &&
                    lineCon[rCount + 2] == '('
                  ) {
                    right = rCount + 4;
                    break;
                  } else {
                    right = rCount + 2;
                    break;
                  }
                }
              }
            }
            if (left > -1 && right > -1 && right > left) {
              console.log(left);
              console.log(right);
              let mcount = 0;
              // 右移
              if (keyCodeRef.current == 39) {
                mcount = right - pos.ch;
              } else {
                mcount = pos.ch - left;
              }
              for (let mc = 0; mc < mcount; mc++) {
                coder.moveH(keyCodeRef.current == 39 ? 1 : -1, 'char');
              }
            }
          }
          // \0${}\0 或者 \0${}\0(\0\0)\0
          if (charStr == '$' || charStr == '{') {
            if (keyCodeRef.current == -1 || keyCodeRef.current == 37) {
              coder.moveH(-1, 'char');
              if (charStr == '{') {
                coder.moveH(-1, 'char');
              }
            }
            // 键盘右移动
            if (keyCodeRef.current == 39) {
              for (let whCount = pos.ch; whCount < lineCon.length; whCount++) {
                if (lineCon[whCount] == '}') {
                  coder.moveH(1, 'char');
                  coder.moveH(1, 'char'); // 右侧空格\0
                  // ${}\0(\0\0)\0
                  if (lineCon[whCount + 2] == '(') {
                    coder.moveH(1, 'char');
                    coder.moveH(1, 'char'); // (空格\0
                  }
                  break;
                }
                coder.moveH(1, 'char');
              }
            }
          }
          // \0${}\0(\0\0)\0
          if (charStr == '(') {
            // 右移
            if (keyCodeRef.current == 39) {
              if (
                reg.test(lineCon.charAt(pos.ch + 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch + 1))
              ) {
                coder.moveH(1, 'char');
                coder.moveH(1, 'char');
              }
            }
            if (keyCodeRef.current == -1 || keyCodeRef.current == 37) {
              if (
                reg.test(lineCon.charAt(pos.ch - 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch - 1))
              ) {
                coder.moveH(-1, 'char');
                let opEnd = pos.ch - 2;
                if (charStr.charAt[opEnd] == '}') {
                  for (let cs = opEnd; cs >= 0; cs--) {
                    if (lineCon.charAt(cs) == '$') {
                      coder.moveH(-1, 'char');
                      coder.moveH(-1, 'char');
                      break;
                    }
                    coder.moveH(-1, 'char');
                  }
                }
              }
            }
          }
          // \0${}\0(\0\0)\0
          if (charStr == ')') {
            if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
              coder.moveH(1, 'char');
              coder.moveH(1, 'char');
            }
            if (keyCodeRef.current == 37) {
              if (
                reg.test(lineCon.charAt(pos.ch - 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch - 1))
              ) {
                coder.moveH(-1, 'char');
              }
            }
          }
        }
      }
      coder.refresh();
    });
    // 键盘按键，主要监听删除键
    coder.on('keyup', (coder, event) => {
      console.log('q=>123');
      keyCodeRef.current = event.keyCode;
      // 删除
      if (event.keyCode == 8) {
        let from = null;
        let to = null;
        let pos = coder.getCursor();
        let lineCon = coder.getLine(pos.line);
        console.log(lineCon.length, '-------', pos.ch);
        let reg =
          /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2022\u2028\u2029\ufeff\ufff9-\ufffc]/g;
        let charStr = lineCon.charAt(pos.ch);
        console.log('删除。。。。。', reg.test(charStr), /[\0]/g.test(charStr), !charStr, charStr);
        let needDel = true;
        if (!charStr) {
          let lastOne = lineCon.charAt(pos.ch - 1);
          console.log(lastOne);
          if (reg.test(lastOne) || /[\0]/g.test(lastOne)) {
            // ${}\0
            if (lineCon.charAt(pos.ch - 2) == '}') {
              let opEnd = pos.ch - 2;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                if (
                  reg.test(lineCon.charAt(opStart - 1)) ||
                  /[\0]/g.test(lineCon.charAt(opStart - 1))
                ) {
                  console.log('变量位置：', opStart - 1, '--->', pos.ch);
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                  to = CodeMirror.Pos(pos.line, pos.ch - 1);
                }
              }
            }
            // )\0
            if (lineCon.charAt(pos.ch - 2) == ')') {
              console.log(lineCon.charAt(pos.ch - 2));
              // 无变量
              from = CodeMirror.Pos(pos.line, pos.ch - 3);
              // 有变量 (\0     \0\0变量名\0\0      \0)
              if (
                (reg.test(lineCon[pos.ch - 4]) || /[\0]/g.test(lineCon[pos.ch - 4])) &&
                (reg.test(lineCon[pos.ch - 5]) || /[\0]/g.test(lineCon[pos.ch - 5]))
              ) {
                from = CodeMirror.Pos(pos.line, pos.ch - 4);
              }
              to = CodeMirror.Pos(pos.line, pos.ch - 1);
            }
            // 匹配左括号，一起删除函数名
            if (
              lineCon.charAt(pos.ch - 2) == '(' &&
              (reg.test(lineCon.charAt(pos.ch - 3)) || /[\0]/g.test(lineCon.charAt(pos.ch - 3)))
            ) {
              let opEnd = pos.ch - 4;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
              }
              to = CodeMirror.Pos(pos.line, pos.ch - 1);
            }
            // 匹配 ( 含手动空格
            if (lineCon.charAt(pos.ch - 2) == ' ') {
              if (
                lineCon.charAt(pos.ch - 3) == '(' &&
                (reg.test(lineCon.charAt(pos.ch - 4)) || /[\0]/g.test(lineCon.charAt(pos.ch - 4)))
              ) {
                let opEnd = pos.ch - 5;
                let opStart = -1;
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    opStart = whCount;
                    break;
                  }
                }
                if (opStart > -1) {
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                }
              }
              to = CodeMirror.Pos(pos.line, pos.ch - 1);
            }
          } else {
            // }
            if (['}', '('].indexOf(lastOne) > -1) {
              let opEnd = pos.ch - 1;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
              }
              to = CodeMirror.Pos(pos.line, pos.ch);
            }
            // )
            if (lastOne == ')') {
              // 空白函数，括号内没有参数
              if (
                reg.test(lineCon.charAt(pos.ch - 2)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch - 2))
              ) {
                if (
                  reg.test(lineCon.charAt(pos.ch - 3)) ||
                  /[\0]/g.test(lineCon.charAt(pos.ch - 3))
                ) {
                  if (lineCon.charAt(pos.ch - 4) == '(') {
                    let opEnd = pos.ch - 6;
                    let opStart = -1;
                    for (let whCount = opEnd; whCount >= 0; whCount--) {
                      if (lineCon[whCount] == '$') {
                        opStart = whCount;
                        break;
                      }
                    }
                    if (opStart > -1) {
                      from = CodeMirror.Pos(pos.line, opStart);
                    }
                    to = CodeMirror.Pos(pos.line, pos.ch);
                  } else {
                    from = CodeMirror.Pos(pos.line, pos.ch - 2);
                    to = CodeMirror.Pos(pos.line, pos.ch);
                    coder.setSelection(from, to);
                    coder.deleteH();
                    needDel = false;
                    keyCodeRef.current = -1;
                  }
                }
              }
            }
          }
        } else {
          if (reg.test(charStr) || /[\0]/g.test(charStr)) {
            // (\0
            if (lineCon[pos.ch - 1] == '(') {
              if (reg.test(lineCon[pos.ch - 2]) || /[\u0]/g.test(lineCon[pos.ch - 2])) {
                let opEnd = pos.ch - 3;
                let opStart = -1;
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    opStart = whCount;
                    break;
                  }
                }
                if (opStart > -1) {
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                }
              }
              to = CodeMirror.Pos(pos.line, pos.ch);
            }
            // }\0
            if (lineCon.charAt(pos.ch - 1) == '}') {
              let opEnd = pos.ch - 1;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                if (
                  reg.test(lineCon.charAt(opStart - 1)) ||
                  /[\0]/g.test(lineCon.charAt(opStart - 1))
                ) {
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                  to = CodeMirror.Pos(pos.line, pos.ch);
                }
              }
            }
          } else {
            if (['(', ')', '$', '{', '}'].indexOf(charStr) == -1) {
              let lastOne = lineCon.charAt(pos.ch - 1);
              console.log(lastOne);
              let opEnd = -1;
              let opStart = -1;
              if (['{', '}', '('].indexOf(lastOne) > -1) {
                opEnd = pos.ch - 1;
              }
              if (lastOne == ')') {
                // 空白函数
                if (reg.test(lineCon[pos.ch - 2]) || /[\0]/g.test(lineCon[pos.ch - 2])) {
                  if (reg.test(lineCon[pos.ch - 3]) || /[\0]/g.test(lineCon[pos.ch - 3])) {
                    console.log(lineCon[pos.ch - 4]);
                    if (lineCon[pos.ch - 4] == '(') {
                      opEnd = pos.ch - 1;
                    } else {
                      from = CodeMirror.Pos(pos.line, pos.ch - 2);
                      to = CodeMirror.Pos(pos.line, pos.ch);
                      coder.setSelection(from, to);
                      coder.deleteH();
                      needDel = false;
                      keyCodeRef.current = -1;
                    }
                  }
                }
              }
              if (opEnd > -1) {
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    opStart = whCount;
                    break;
                  }
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
                to = CodeMirror.Pos(pos.line, pos.ch);
              }
            }
            // 删除括号中的变量
            if (charStr == ')') {
              let lastOne = lineCon.charAt(pos.ch - 1);
              console.log(reg.test(lastOne), /[\0]/g.test(lastOne));
              if (reg.test(lastOne) || /[\0]/g.test(lastOne)) {
                let ep = pos.ch - 2;
                // 括号里面清空了不做操作    (空格空格)
                if (
                  reg.test(lineCon.charAt(pos.ch - 2)) ||
                  /[\0]/g.test(lineCon.charAt(pos.ch - 2))
                ) {
                  ep = -1; // pos.ch - 3
                }
                if (ep > -1) {
                  // 变量
                  if (lineCon.charAt(ep) == '}') {
                    let opEnd = ep;
                    let opStart = -1;
                    for (let whCount = opEnd; whCount >= 0; whCount--) {
                      if (lineCon[whCount] == '$') {
                        opStart = whCount;
                        break;
                      }
                    }
                    if (opStart > -1) {
                      if (
                        reg.test(lineCon.charAt(opStart - 1)) ||
                        /[\0]/g.test(lineCon.charAt(opStart - 1))
                      ) {
                        from = CodeMirror.Pos(pos.line, opStart - 1);
                        to = CodeMirror.Pos(pos.line, pos.ch - 1);
                      }
                    }
                  }
                  // 函数左括号(
                  if (lineCon.charAt(ep) == '(') {
                    if (reg.test(lineCon.charAt(ep - 1)) || /[\0]/g.test(lineCon.charAt(ep - 1))) {
                      let opEnd = ep - 1;
                      let opStart = -1;
                      for (let whCount = opEnd; whCount >= 0; whCount--) {
                        if (lineCon[whCount] == '$') {
                          opStart = whCount;
                          break;
                        }
                      }
                      if (opStart > -1) {
                        from = CodeMirror.Pos(pos.line, opStart - 1);
                        to = CodeMirror.Pos(pos.line, pos.ch - 1);
                      }
                    }
                  }
                  // 函数名
                  if (charStr && ['$', '{', '}', '(', ')'].indexOf(lineCon.charAt(ep)) == -1) {
                    let opEnd = ep;
                    let opStart = -1;
                    for (let whCount = opEnd; whCount >= 0; whCount--) {
                      if (lineCon[whCount] == '$') {
                        opStart = whCount;
                        break;
                      }
                    }
                    if (opStart > -1) {
                      from = CodeMirror.Pos(pos.line, opStart - 1);
                      to = CodeMirror.Pos(pos.line, pos.ch - 1);
                    }
                  }
                }
              }
            }
            // 删除函数名
            if (charStr == '(') {
              let opEnd = pos.ch - 1;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
                to = CodeMirror.Pos(pos.line, pos.ch - 1);
              }
            }
          }
        }
        if (from && to && needDel) {
          coder.setSelection(from, to);
          coder.deleteH();
          keyCodeRef.current = -1;
          console.log('00000000000000000000', from, to);
        }
      } else {
        keyCodeRef.current = -1;
      }
    });
    // 键盘按下，更新keycode，主要记录左右移动
    coder.on('keydown', (coder, event) => {
      if ([8, 37, 39].indexOf(event.keyCode) > -1) {
        keyCodeRef.current = event.keyCode;
      } else {
        keyCodeRef.current = -1;
      }
    });
    // 鼠标按下， 重置keycode
    coder.on('mousedown', (coder, event) => {
      keyCodeRef.current = -1;
    });
  }, []);

  const addVariable = (item: any, index: any) => {
    console.log(item);
    let con = '\0' + ('${' + item.id + '}') + '\0';
    if (!item.param) {
      con += '(' + '\0\0' + ')' + '\0';
    }
    coderRef.current.replaceSelection(con, undefined, undefined, { ...item, parent: index + 1 });
  };

  const className = classNames(s.formula);
  return (
    <div className={className}>
      <div className="formula-panel-top">
        <div className="formula-panel formula-panel-editor">
          <p className="formula-panel-title">
            {label}
            <span className="formula-panel-subtitle">=</span>
          </p>
          <div className="formula-panel-content">
            <div className="formula-editor">
              <textarea ref={textareaRef} id="textarea"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="formula-panel-bottom">
        {data.map((item) => {
          return (
            <div className="formula-panel">
              <p className="formula-panel-title">
                <span className="formula-panel-title-text">{item.title}</span>
              </p>
              {item.type == 'tree' && (
                <div className="formula-panel-content">
                  <div className="formula-panel-item-filed">
                    <Collapse>
                      {item.data.map((currItem) => {
                        return (
                          <Panel key={`tree-data-item-${item.title}`} header={currItem.title}>
                            <ul className="function-panel-filed-list">
                              {currItem.data.map((relItem, index) => {
                                const realClassName = classNames('formula-filed-capsule', {
                                  blue: relItem.jvsParamType == 'text',
                                  yellow: relItem.jvsParamType == 'number',
                                  green: relItem.jvsParamType == 'date',
                                  purple: relItem.jvsParamType == 'array',
                                  red: relItem.jvsParamType == 'object',
                                  cyan: relItem.jvsParamType == 'unknown',
                                });
                                return (
                                  <li
                                    className="function-panel-filed-li"
                                    onClick={() => addVariable(relItem, index)}
                                  >
                                    <span className="formula-func-title show-type">
                                      {relItem.name}
                                    </span>
                                    <div className={realClassName}>
                                      {getLabeType(relItem.jvsParamType)}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </Panel>
                        );
                      })}
                    </Collapse>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="formula-panel formula-panel-func-desc">
          <p className="formula-panel-title">
            <span className="formula-panel-title-text">
              {currentData ? currentData.name : '说明'}
            </span>
          </p>
          {currentData ? (
            <div className="formula-panel-content info-section">
              <div>
                <p>{currentData.type}</p>
                <div
                  className="info-text"
                  dangerouslySetInnerHTML={{ __html: currentData.info }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="formula-panel-content info-section">
              <div>
                <p>请从左侧面板选择字段名和函数，或输入函数</p>
                <p>
                  公式编辑举例：<span className="fun">SUM</span>(
                  <span className="param">参数1</span>,<span className="param">参数2</span>)
                </p>
                <p>
                  <a>查看基本公式的帮助文档</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
