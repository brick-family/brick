/**
 * 当前是否是设计态
 * @param props
 * @returns
 */
export const isDesign = (props: any) => {
  return props.__designMode === 'design';
};

/**
 * 获取低代码引擎的 project
 * @returns
 */
const getProject = () => {
  // @ts-ignore
  return window?.AliLowCodeEngine?.project;
};

/**
 * 当前是否是移动端
 */
export const isMobile = () => {
  const project = getProject();
  return project?.simulatorHost?.get('device') === 'phone';
};

/**
 * 当前是否是移动端
 */
export const isH5 = () => {
  const project = getProject();
  return project?.simulatorHost?.get('device') === 'phone';
};
