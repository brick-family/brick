import { IFunctionData } from '../../types';

/**
 * 对象函数
 */
export const ObjectFunctionData: IFunctionData[] = [
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
];
