import { Graph } from '@antv/x6';
import { useEffect } from 'react';
import { useWorkflowAppSelector } from '../../../processor';
import { IWorkflowEntity } from '../../../types';

export interface IUseSetWorkflowData {
  data: IWorkflowEntity;
}

export const useSetWorkflowData = ({ data }: IUseSetWorkflowData) => {
  const [setWorkflowData] = useWorkflowAppSelector((s) => [s.setWorkflowData]);
  useEffect(() => {
    if (data) {
      setWorkflowData(data);
    }
  }, [data]);
};
