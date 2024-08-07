import { MathFunctionData } from './MathFuntionData';
import { StringFunctionData } from './StringFunctionData';
import { LoginFunctionData } from './LogicFunctionData';
import { NumberFunctionData } from './NumberFunctionData';
import { ObjectFunctionData } from './ObjectFunctionData';
import { TimeFunctionData } from './TimeFunctionData';
import { CollectionFunctionData } from './CollectionData';

/**
 * 函数相关数据
 */
export const FunctionData = {
  title: '函数列表',
  type: 'tree',
  data: [
    {
      title: '基础函数 - 数学函数',
      data: MathFunctionData,
    },
    {
      title: '基础函数 - 文字函数',
      data: StringFunctionData,
    },
    {
      title: '基础函数 - 逻辑函数',
      data: LoginFunctionData,
    },
    {
      title: '基础函数 - 集合函数',
      data: CollectionFunctionData,
    },
    {
      title: '基础函数 - 时间函数',
      data: TimeFunctionData,
    },
    {
      title: '基础函数 - 对象函数',
      data: ObjectFunctionData,
    },
    {
      title: '基础函数 - 数字函数',
      data: NumberFunctionData,
    },
  ],
};
