import React, { FC } from 'react';
import { LowcodeEditorContent } from './LowcodeEditorContent';
import { LowcodeEditorProvider, useLowcodeEditorSelector } from './lowcode-processor';
import { BSpin } from '@brick/component';
import s from './global.less';

export interface ILowcodeEditorWrapperProps {}

export const LowcodeEditorWrapper: FC<ILowcodeEditorWrapperProps> = (props) => {
  const [loading, tableData] = useLowcodeEditorSelector((s) => [s.loading, s.tableData]);

  // useEffect(() => {
  //   return () => {
  //     console.log('q=>load---destory',);
  //   }
  // }, [])
  console.log('tableData', tableData);
  if (loading || !tableData) {
    return <BSpin className={s.spin} />;
  }

  // return <div>sfsdf</div>
  // 显示loadding
  return <LowcodeEditorContent />;
};

export interface ILowcodeEditorProps {
  appId: string;
  resourceId: string;
}

export const LowcodeEditor: FC<ILowcodeEditorProps> = (props) => {
  return (
    <LowcodeEditorProvider {...props}>
      <LowcodeEditorWrapper />
    </LowcodeEditorProvider>
  );
};
