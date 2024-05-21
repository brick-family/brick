import React from 'react';

export function groupArray(array: any[], groupLength: number) {
  // console.log('q=>arrayarray',array, groupLength);
  // let index = 0;
  const newArray: any = [];
  let closCount = 0;
  let tmpArray: any = [];

  // TODO 代码需优化
  for (let i = 0; i < array.length; i++) {
    const currNode = array[i];
    const { cols = 1 } = currNode?.props || {};
    closCount += cols;

    if (closCount < groupLength) {
      tmpArray.push(currNode);
    }

    if (closCount === groupLength) {
      tmpArray.push(currNode);
      newArray.push(tmpArray);
      tmpArray = [];
      closCount = 0;
    }

    if (closCount > groupLength) {
      // 计算出需要补的内容
      fillReactElement(groupLength, tmpArray);
      newArray.push(tmpArray);
      tmpArray = [currNode];
      closCount = cols;
      // 再次判断行数量是否等于分组数量
      if (closCount === groupLength) {
        newArray.push(tmpArray);
        tmpArray = [];
        closCount = 0;
      }
    }

    if (i === array.length - 1 && tmpArray.length > 0) {
      // 计算出需要补的内容
      fillReactElement(groupLength, tmpArray);
      newArray.push(tmpArray);
    }
  }

  return newArray;
}
function fillReactElement(groupLength: number, tmpArray: any) {
  const diff = groupLength - tmpArray.length;
  for (let j = 0; j < diff; j++) {
    tmpArray.push(React.createElement('div'));
  }
}
