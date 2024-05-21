import { useRequest } from 'ahooks';
import { getRelationInfoByTableId } from '@brick/services';
import { useEffect, useMemo } from 'react';

export const useRelationTableInfo = (relationTableId: string) => {
  const { data, loading, run } = useRequest((id) => getRelationInfoByTableId(id), {
    manual: true,
  });

  useEffect(() => {
    if (relationTableId) {
      run(relationTableId);
    }
  }, [relationTableId]);

  const options = useMemo(() => {
    return (
      data?.map((item) => {
        return {
          label: `${item?.resourceEntity?.title} (被 ${item?.columnEntity?.title} 管理）`,
          value: item.tableId,
        };
      }) || []
    );
  }, [data]);

  return { options };
};

//
