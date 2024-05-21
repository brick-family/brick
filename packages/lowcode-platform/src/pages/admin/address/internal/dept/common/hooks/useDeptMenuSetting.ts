import { useMemo } from 'react';
import { IMenuListProps } from '@/components';
import { EResourceType, IDeptEntity, IResourceEntity, TMenuData } from '@brick/types';
import { SETTING_MENU_MAP } from '@/constanst';
import { useInternalSelector } from '../../../internal-processor';
import { message, Modal } from 'antd';
import { deleteDept } from '@brick/services';
import { useParams } from '@umijs/max';

// 分组菜单
const DeptMenu = [SETTING_MENU_MAP.rename, SETTING_MENU_MAP.createDept, SETTING_MENU_MAP.delete];
const DeptMenuNoDelete = [SETTING_MENU_MAP.rename, SETTING_MENU_MAP.createDept];

export const useDeptMenuSetting = () => {
  const [setModalData, queryDeptAll] = useInternalSelector((s) => [
    s.modalProcessor.setModalData,
    s.deptProcessor.queryDeptAll,
  ]);

  const getSettingMenu = (nodeData: TMenuData<IDeptEntity>) => {
    console.log('nodeData', nodeData);

    if (nodeData.pid == '0' || !nodeData.pid) {
      return DeptMenuNoDelete;
    }
    return DeptMenu;
  };

  const deleteFun = (nodeData: TMenuData<IDeptEntity>) => {
    if (nodeData?.children?.length > 0) {
      message.error('该分组下有内容，请删除内容后在删除分组！');
      return;
    }
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async (close) => {
        try {
          await deleteDept(nodeData?.id!);
          message.success('删除成功！');
          await queryDeptAll();
          // refresh?.();
          close();
        } catch (error) {
          return false;
        }
      },
    });
  };

  const settingMenu = useMemo((): IMenuListProps<TMenuData<IDeptEntity>>['settingMenu'] => {
    return {
      getItems: getSettingMenu,
      operationCallback: {
        onReNameCallback: (nodeData) => {
          setModalData({ type: 'rename', data: nodeData, open: true });
        },
        onCreateDeptCallback: (nodeData) => {
          setModalData({ type: 'addDept', data: nodeData, open: true });
        },
        onDeleteCallback: (nodeData) => {
          deleteFun(nodeData);
        },
      },
    };
  }, [DeptMenu]);

  return { settingMenu };
};
