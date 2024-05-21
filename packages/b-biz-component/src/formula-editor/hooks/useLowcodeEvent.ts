import { event } from '@alilc/lowcode-engine';
import { EDefaultValueSetterEventName } from '@brick/types';
import { useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useFormulaEditorSelector } from '../formula-editor-processor';

// window.ev = event;
export const useLowcodeEvent = () => {
  const [setModalDataObservable] = useFormulaEditorSelector((s) => [
    s.modelProcessor.setModalDataObservable,
  ]);
  const handle = useMemoizedFn((value) => {
    console.log('q=>showDialog', value);
    setModalDataObservable((draft) => draft.open.set(true));
  });
  useEffect(() => {
    console.log('q=>bing', event, EDefaultValueSetterEventName.ShowDialog);
    event.on(EDefaultValueSetterEventName.ShowDialog, handle);
    return () => {
      event.off(EDefaultValueSetterEventName.ShowDialog, handle);
    };
  }, []);

  const sendData = useMemoizedFn((value) => {
    event.emit(EDefaultValueSetterEventName.ValueChange, value);
  });

  return {
    sendData,
  };
};
