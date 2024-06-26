import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import { getAssetsJson } from '../../utils';
import { getLp } from '@brick/lowcode-editor';

const EditorInitPlugin = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      const { material, project, config } = ctx;
      // const scenarioName = options['scenarioName'];
      // const scenarioDisplayName = options['displayName'] || scenarioName;
      // const scenarioInfo = options['info'] || {};
      // // 保存在config中用于引擎范围其他插件使用
      // config.set('scenarioName', scenarioName);
      // config.set('scenarioDisplayName', scenarioDisplayName);
      // config.set('scenarioInfo', scenarioInfo);

      // convertTableColumnSchemaByData

      // 设置物料描述
      const assets = getAssetsJson();
      await material.setAssets(await injectAssets(assets));

      // 设置lowcode projectApi
      getLp()?.setSchema();
      // dataService.lowcodeSetSchema();

      // TODO 临时设置成移动端展示
      // setTimeout(() => {
      //   const simulator = project.simulatorHost;
      //   // 切换画布
      //   simulator?.set('device', 'phone');
      // }, 1000);
    },
  };
};
EditorInitPlugin.pluginName = 'EditorInitPlugin';
// EditorInitPlugin.meta = {
//   preferenceDeclaration: {
//     title: '保存插件配置',
//     properties: [
//       {
//         key: 'scenarioName',
//         type: 'string',
//         description: '用于localstorage存储key',
//       },
//       {
//         key: 'displayName',
//         type: 'string',
//         description: '用于显示的场景名',
//       },
//       {
//         key: 'info',
//         type: 'object',
//         description: '用于扩展信息',
//       }
//     ],
//   },
// };
export default EditorInitPlugin;
