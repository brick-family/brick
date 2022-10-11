import AntdInputMeta from '/Users/qiaojie/Code/github.com/jiechud/contain/packages/ui-material/lowcode/antd-input/meta'
import FieldInputMeta from '/Users/qiaojie/Code/github.com/jiechud/contain/packages/ui-material/lowcode/field-input/meta'
import FormContainerMeta from '/Users/qiaojie/Code/github.com/jiechud/contain/packages/ui-material/lowcode/form-container/meta'

const componentCategorySort = {};
["基础元素","布局容器类","表格类","表单详情类","帮助类","对话框类","业务类","通用","引导","信息输入","信息展示","信息反馈"]
  .reverse()
  .forEach((item, index) => {
    componentCategorySort[item] = ++index;
  });

function generateComponentList(components) {
  const componentList = [
    {
      title: '常用',
      icon: '',
      children: [],
    },
    {
      title: '容器',
      icon: '',
      children: [],
    },
    {
      title: '导航',
      icon: '',
      children: [],
    },
    {
      title: '内容',
      icon: '',
      children: [],
    },
    {
      title: 'Feedback 反馈',
      icon: '',
      children: [],
    },
  ];

  const groupMap = {
    原子组件: true,
  };
  const compGroup = {};

  components.forEach((comp) => {
    const category = comp.category || '其他';
    if (comp.group && !compGroup[comp.componentName]) {
      compGroup[comp.componentName] = comp.group;
    }
    if (comp.group && !groupMap[comp.group]) {
      groupMap[comp.group] = true;
    }
    let target = componentList.find((item) => item.title === category);
    if (!target) {
      target = {
        title: category,
        icon: '',
        children: [],
      };

      componentList.push(target);
    }

    if (comp.snippets && comp.snippets.length) {
      target.children.push({
        componentName: comp.componentName,
        title: comp.title || comp.componentName,
        sort: {
          category: target.title,
          group: compGroup[comp.componentName] || '原子组件',
          priority: componentCategorySort[target.title] || 0,
        },
        icon: '',
        package: comp.npm.pkg,
        snippets: comp.snippets || [],
      });
    }
  });
  return componentList;
}

function fillRealVersion(meta, packageName = 'contain-ui-material', version = '0.1.5', basicLibraryVersion={"@alifd/next":"1.25.23","@alifd/meet":"2.6.3","antd":"4.17.3"}) {
  if (!meta || !version) {
    return meta;
  }
  const { npm } = meta;
  if (!npm) {
    return meta;
  }
  if (typeof basicLibraryVersion === 'object' && basicLibraryVersion[npm.package]) {
    meta.npm = {
      ...npm,
      version: basicLibraryVersion[npm.package]
    };
  } else if (npm.package === packageName) {
    meta.npm = {
      ...npm,
      version
    };
  }
  return meta;
}

const componentMetas = [AntdInputMeta,FieldInputMeta,FormContainerMeta];
const components = [];
const npmInfo = {};
componentMetas.forEach(meta => {
  if (Array.isArray(meta)) {
    components.push(
      ...meta.map((item) => {
        if (!item.npm) {
          const { componentName } = item;
          const names = componentName.split('.');
          const [exportName, subName] = names;
          item.npm = {
            exportName: exportName,
            main: '',
            destructuring: true,
            subName: names.length > 1 ? componentName.slice(componentName.indexOf('.') + 1) : subName,
          };
        }
        item.npm = { ...npmInfo, ...(item.npm || {}) };
        return fillRealVersion(item);
      }),
    );
  } else if (meta.components) {
    components.push(
      ...meta.components.map((item) => {
        if (!item.npm) {
          const { componentName } = item;
          const names = componentName.split('.');
          const [exportName, subName] = names;
          item.npm = {
            exportName: exportName,
            main: '',
            destructuring: true,
            subName: names.length > 1 ? componentName.slice(componentName.indexOf('.') + 1) : subName,
          };
        }
        item.npm = { ...npmInfo, ...(item.npm || {}) };
        return fillRealVersion(item);
      }),
    );
  } else {
    if (!meta.npm) {
      const { componentName } = meta;
      const names = componentName.split('.');
      const [exportName, subName] = names;
      meta.npm = {
        exportName: exportName,
        main: '',
        destructuring: true,
        subName: names.length > 1 ? componentName.slice(componentName.indexOf('.') + 1) : subName,
      };
    }
    meta.npm = { ...npmInfo, ...(meta.npm || {}) };
    components.push(fillRealVersion(meta));
  }
});

const componentList = generateComponentList(components);

export { components, componentList };

const execCompile = !!true;

if (!execCompile) {
  window.ContainUiMaterialMeta = { components, componentList };
}