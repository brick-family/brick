import React from 'react';
import { Icon } from '@alifd/next';
import { project } from '@alilc/lowcode-engine';
import { Divider } from 'antd';

import './simultor.less';

const devices = [
  { key: 'default' },
  // { key: 'tablet' },
  { key: 'phone' },
];

const CustomIcon = Icon.createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/c/font_4058713_zovbpz02h3h.js',
});

export class SimulatorResizePane extends React.Component {
  static displayName = 'SimulatorResizePane';

  state = {
    active: 'default',
    currentWidth: null,
  };

  componentDidMount() {
    // @ts-ignore
    const onSimulatorRendererReady = project.onSimulatorRendererReady //|| 类型问题，先去掉 project.onRendererReady
      .bind(project);
    onSimulatorRendererReady(() => {
      const currentWidth =
        document.querySelector('.lc-simulator-canvas')?.clientWidth || this.state.currentWidth || 0;
      this.setState({
        currentWidth,
      });
    });
  }

  change = (device: string) => {
    const simulator = project.simulatorHost;
    // 切换画布
    simulator?.set('device', device);
    // @ts-ignore
    if (document.querySelector('.lc-simulator-canvas')?.style) {
      // @ts-ignore
      document.querySelector('.lc-simulator-canvas').style.width = null;
    }
    setTimeout(() => {
      const currentWidth =
        document.querySelector('.lc-simulator-canvas')?.clientWidth || this.state.currentWidth || 0;
      this.setState({
        active: device,
        currentWidth,
      });
    }, 0);
  };

  renderItemSVG(device: string) {
    switch (device) {
      case 'default':
        return <CustomIcon size="large" type="iconic_PC_Select" />;
      case 'tablet':
        return <CustomIcon size="large" type="iconic_Tablet_Select" />;
      case 'phone':
        return <CustomIcon size="large" type="iconic_smartphone" />;
      default:
        return <CustomIcon size="large" type="iconic_PC_Select" />;
    }
  }

  // @ts-ignore
  render() {
    const currentWidth = this.state.currentWidth || 0;
    return (
      <>
        <div className="lp-simulator-pane">
          {devices.map((item, index) => {
            return (
              <span
                key={item.key}
                className={`lp-simulator-pane-item ${
                  this.state.active === item.key ? 'active' : ''
                }`}
                onClick={this.change.bind(this, item.key)}
              >
                {this.renderItemSVG(item.key)}
              </span>
            );
          })}
          {/* <div className='lp-simulator-width-setter'>
          <NumberPicker className="lp-simulator-width-input" addonTextAfter="px" value={currentWidth} placeholder="请输入" onChange={(value) => {
            this.setState({
              currentWidth: value
            });
          }} onPressEnter={(event: any) => {
            const value = event?.target?.value;
            const simulator = project.simulatorHost;
            simulator?.set('deviceStyle', {
              canvas: {
                width: `${value}px`,
              }
            })
            this.setState({
              currentWidth: value
            });
          }} />
        </div> */}
        </div>
        <Divider type="vertical" />
      </>
    );
  }
}

export const SimulatorPlugin = (ctx: any) => {
  const SimulatorResizePaneRef = React.createRef<SimulatorResizePane>();

  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 往引擎增加工具条
      ctx.skeleton.add({
        area: 'toolbar',
        name: 'SimulatorPlugin',
        type: 'Widget',
        props: {
          description: '切换画布尺寸',
          align: 'right',
        },
        content: <SimulatorResizePane ref={SimulatorResizePaneRef} />,
      });
    },
  };
};

SimulatorPlugin.pluginName = 'SimulatorPlugin';
