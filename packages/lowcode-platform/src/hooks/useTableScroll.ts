import { useEffect, useRef, useState } from 'react';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';

/**
 * 获取表格的y的滚动距离
 * @param diffHeight 差值
 */
export const useTableScroll = (diffHeight: number = 100) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<RcTableProps['scroll']>({ y: 0 });

  useEffect(() => {
    if (containerRef?.current) {
      setScroll({
        y: containerRef?.current?.offsetHeight - diffHeight,
      });
    }
  }, [containerRef.current]);

  return {
    containerRef,
    scroll,
  };
};
