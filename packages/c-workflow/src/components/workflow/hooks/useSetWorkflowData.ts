import { Graph } from '@antv/x6';
import { useEffect } from 'react';
import { useWorkflowAppSelector } from '../../../processor';
import { IWorkflowEntity } from '../../../types';

export interface IUseSetWorkflowData {
  data: IWorkflowEntity;
}

export const useSetWorkflowData = ({ data }: IUseSetWorkflowData) => {
  const [setWorkflowData, graphProcessor] = useWorkflowAppSelector((s) => [
    s.setWorkflowData,
    s.graphProcessor,
  ]);
  useEffect(() => {
    if (data) {
      setWorkflowData(data);
    }
  }, [data]);
};
