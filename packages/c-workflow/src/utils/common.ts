// const data: IConnectionData[] = [
//   { sourceId: '4', targetId: '5' },
//   { sourceId: '1', targetId: '2' },
//   { sourceId: '1', targetId: '3' },
//   { sourceId: '2', targetId: '4' },
// ];

// const graph: { [key: string]: string[] } = {};
// const inDegree: { [key: string]: number } = {};

// for (const item of data) {
//   const { sourceId, targetId } = item;
//   // 构建邻接表
//   if (!graph[sourceId]) {
//     graph[sourceId] = [];
//   }
//   graph[sourceId].push(targetId);

//   // 统计入度
//   if (!inDegree[targetId]) {
//     inDegree[targetId] = 0;
//   }
//   inDegree[targetId]++;
// }

// const result: string[][] = [];
// const zeroInDegree: string[] = Object.keys(graph).filter((node) => !inDegree[node]);

// while (zeroInDegree.length) {
//   const level: string[] = [];
//   const nextZeroInDegree: string[] = [];

//   for (const node of zeroInDegree) {
//     level.push(node);

//     if (graph[node]) {
//       for (const neighbor of graph[node]) {
//         inDegree[neighbor]--;
//         if (inDegree[neighbor] === 0) {
//           nextZeroInDegree.push(neighbor);
//         }
//       }
//     }
//   }

//   result.push(level);
//   zeroInDegree.length = 0;
//   zeroInDegree.push(...nextZeroInDegree);
// }

// console.log(result);

import { IConnectionData } from '@brick/types';

export const convertToLevelTree = (data: Array<IConnectionData>) => {
  const graph: { [key: string]: string[] } = {};
  const inDegree: { [key: string]: number } = {};

  for (const item of data) {
    const { sourceId, targetId } = item;
    // 构建邻接表
    if (!graph[sourceId]) {
      graph[sourceId] = [];
    }
    graph[sourceId].push(targetId);

    // 统计入度
    if (!inDegree[targetId]) {
      inDegree[targetId] = 0;
    }
    inDegree[targetId]++;
  }

  const result: string[][] = [];
  const zeroInDegree: string[] = Object.keys(graph).filter((node) => !inDegree[node]);

  while (zeroInDegree.length) {
    const level: string[] = [];
    const nextZeroInDegree: string[] = [];

    for (const node of zeroInDegree) {
      level.push(node);

      if (graph[node]) {
        for (const neighbor of graph[node]) {
          inDegree[neighbor]--;
          if (inDegree[neighbor] === 0) {
            nextZeroInDegree.push(neighbor);
          }
        }
      }
    }

    result.push(level);
    zeroInDegree.length = 0;
    zeroInDegree.push(...nextZeroInDegree);
  }

  return result;
};
