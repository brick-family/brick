import { useEffect } from 'react';
import { EFiledEventName } from '../_event';
import { event } from '@alilc/lowcode-engine';
import { useMemoizedFn, useUpdate } from 'ahooks';

export interface IUseReRenderEventProps {
  /**
   * 是否绑定事件，默认为true
   */
  isBindEvent: boolean;
}

export const useReRenderEvent = (props?: IUseReRenderEventProps) => {
  const { isBindEvent = true } = props || {};
  const update = useUpdate(); // 强制触发更新

  const reRenderEvent = useMemoizedFn(() => {
    update();
  });

  /**
   * 发送重新渲染事件
   */
  const sendReRenderEvent = useMemoizedFn(() => {
    event.emit(EFiledEventName.ReRenderEmit);
  });

  useEffect(() => {
    isBindEvent && event.on(EFiledEventName.ReRender, reRenderEvent);
    return () => {
      isBindEvent && event.off(EFiledEventName.ReRender, reRenderEvent);
    };
  }, [isBindEvent]);

  return {
    sendReRenderEvent,
  };
};
