import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ENodeType } from '../types';

// g6注册node常量
export const SHAPE_NODE = `SHAPE_NODE`;

/**
 * Node节点的宽度
 */
export const NODE_WIDTH = 220;
/**
 * Node节点的高度
 */
export const NODE_HEIGHT = 80;

/**
 * 小尺寸Node节点的宽度
 */
export const NODE_WIDTH_SMALL = 90;
/**
 * 小尺寸node节点的高度
 */
export const NODE_HEIGHT_SMALL = 40;

/**
 * 节点的gap
 */
export const NODE_GAP = 65;

/**
 * 系统节点数据
 */
const PANEL_SYSTEM_NODE = [
  {
    id: ENodeType.TableEvent,
    type: ENodeType.TableEvent,
    label: '表单事件触发',
    icon: React.createElement(PlusOutlined) as any,
  },
];

/**
 * 数据节点
 */
const PANEL_DATA_NODE = [
  {
    id: ENodeType.AddData,
    type: ENodeType.AddData,
    label: '新增数据',
    icon: React.createElement(PlusOutlined) as any,
  },
  {
    id: ENodeType.UpdateData,
    type: ENodeType.UpdateData,
    label: '更新数据',
    icon: React.createElement(SyncOutlined) as any,
  },
  {
    id: ENodeType.GetOneData,
    type: ENodeType.GetOneData,
    label: '获取单条数据',
    icon: React.createElement(SearchOutlined) as any,
  },
  {
    id: ENodeType.GetMoreData,
    type: ENodeType.GetMoreData,
    label: '获取多条数据',
    icon: React.createElement(SearchOutlined) as any,
  },
  {
    id: ENodeType.DeleteData,
    type: ENodeType.DeleteData,
    label: '删除数据',
    icon: React.createElement(DeleteOutlined) as any,
  },
  {
    id: ENodeType.Condition,
    type: ENodeType.Condition,
    label: '条件分支',
    icon: React.createElement(DeleteOutlined) as any,
  },
  {
    id: ENodeType.Placeholder,
    type: ENodeType.Placeholder,
    label: '占为分支',
    icon: React.createElement(DeleteOutlined) as any,
  },
  {
    id: ENodeType.End,
    type: ENodeType.End,
    label: '结束',
  },
];

/**
 * 逻辑控制节点
 */
const PANEL_DATA_LOGIC = [
  {
    id: ENodeType.Condition,
    type: ENodeType.Condition,
    label: '条件分支',
    icon: React.createElement(PlusOutlined) as any,
  },
  {
    id: ENodeType.Loop,
    type: ENodeType.Loop,
    label: '循环分支',
    icon: React.createElement(PlusOutlined) as any,
  },
];

const PANEL_DATA_PERSON = [
  {
    id: ENodeType.SendAudit,
    type: ENodeType.SendAudit,
    label: '发送审批',
    icon: React.createElement(UserOutlined) as any,
  },
];

/**
 * 节点选择面板所有数据
 */
export const PANEL_ALL_DATA = [...PANEL_SYSTEM_NODE, ...PANEL_DATA_NODE, ...PANEL_DATA_PERSON];

/**
 * 工作流表类型的node data
 */
export const WORKFLOW_TABLE_NODE_DATA = [
  {
    id: 1,
    label: '数据节点',
    children: PANEL_DATA_NODE,
  },
  {
    id: 2,
    label: '逻辑控制',
    children: PANEL_DATA_LOGIC,
  },
  {
    id: 3,
    label: '人员节点',
    children: PANEL_DATA_PERSON,
  },
];
