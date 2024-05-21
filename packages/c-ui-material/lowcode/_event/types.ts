export enum EFiledEventName {
  // 数值格式发生变化
  FormatChange = 'common:SelectSetter:FormatChange',
  FormatChangeEmit = 'SelectSetter:FormatChange',

  // 数值小数位发生变化
  DecimalPlaceChange = 'common:SelectSetter:DecimalPlaceChange',
  DecimalPlaceChangeEmit = 'SelectSetter:DecimalPlaceChange',

  // 重新渲染
  ReRender = 'common:ReRender',
  ReRenderEmit = 'ReRender',
}
