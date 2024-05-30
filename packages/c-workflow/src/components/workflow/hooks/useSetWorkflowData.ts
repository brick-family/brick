import { Graph } from '@antv/x6';
import { useEffect } from 'react';
import { useWorkflowAppSelector } from '../../../processor';
import { IWorkflowEntity } from '../../../types';

export interface IUseSetWorkflowData {
  data: IWorkflowEntity;
  graph: Graph;
}

export const useSetWorkflowData = ({ data, graph }: IUseSetWorkflowData) => {
  const [setWorkflowData, graphProcessor] = useWorkflowAppSelector((s) => [
    s.setWorkflowData,
    s.graphProcessor,
  ]);
  useEffect(() => {
    if (graph && data) {
      graph.fromJSON(data.graph);
      // 重绘
      graphProcessor?.redraw?.();
      setWorkflowData(data);
    }
  }, [data, graph]);
};
