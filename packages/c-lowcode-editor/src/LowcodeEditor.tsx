import React, { FC } from 'react';
import { LowcodeEditorContent } from './LowcodeEditorContent';
import { LowcodeEditorProvider, useLowcodeEditorSelector } from './lowcode-processor';
import { BSpin } from '@brick/component';
import s from './global.less';
import { IResourceEntityIncludeResource } from '@brick/types';
import { ILowcodeEditorInstance } from './types';

export interface ILowcodeEditorWrapperProps {}

export const LowcodeEditorWrapper: FC<ILowcodeEditorWrapperProps> = (props) => {
  const [resourceData] = useLowcodeEditorSelector((s) => [s.resourceData]);

  console.log('q=>tableSchema-resourceData', resourceData);
  if (!resourceData) {
    return <BSpin className={s.spin} />;
  }

  // 显示loadding
  return <LowcodeEditorContent />;
};

export interface ILowcodeEditorProps {
  resourceData: IResourceEntityIncludeResource;
}

export const LowcodeEditor = React.forwardRef<ILowcodeEditorInstance, ILowcodeEditorProps>(
  (props, ref) => {
    return (
      <LowcodeEditorProvider {...props} ref={ref}>
        <LowcodeEditorWrapper />
      </LowcodeEditorProvider>
    );
  }
);
