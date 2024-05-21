import { Graph } from '@antv/x6';
import { useEffect } from 'react';
import { useWorkflowSelector } from '../../../processor';
import { TWorkflowData } from '../../../types';

export interface IUseSetWorkflowData {
  data: TWorkflowData;
  graph: Graph;
}

export const useSetWorkflowData = ({ data, graph }: IUseSetWorkflowData) => {
  const [setWorkflowData] = useWorkflowSelector((s) => [s.setWorkflowData]);
  useEffect(() => {
    if (graph && data) {
      console.log('q=>', data);
      graph.fromJSON(data.graphData);
      setWorkflowData(data);
    }
  }, [data, graph]);
};
