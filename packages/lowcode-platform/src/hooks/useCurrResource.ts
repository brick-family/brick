import { useParams } from 'umi';
import { useGlobalSelector } from '@brick/processor';
import { IResourceEntity } from '@brick/types';
import { useCreation } from 'ahooks';

function findResource(rId: string, resources: IResourceEntity[]) {
  return resources?.find((f) => f.id === rId);
}

/**
 * 获取当前资源
 */
export const useCurrResource = () => {
  const { resourceId } = useParams();

  const [resources] = useGlobalSelector((s) => [s.resources]);

  const resource = useCreation(() => {
    if (resourceId && resources?.list?.length) {
      return findResource(resourceId, resources.list);
    }
    return null;
  }, [resourceId, resources]);

  return {
    resource,
  };
};
