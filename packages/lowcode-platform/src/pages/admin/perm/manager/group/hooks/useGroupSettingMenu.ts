import { useMemo } from 'react';
import { IMenuListProps } from '@/components';
import { SETTING_MENU_MAP } from '@/constanst';
import { message, Modal } from 'antd';
import { useAdminPermManagerSelector } from '@/pages/admin/perm/manager/admin-perm-manager-processor';
import { ITenantGroupEntity } from '@brick/types';
// 普通项菜单
const ItemMenu = [SETTING_MENU_MAP.rename, SETTING_MENU_MAP.delete];

export const useGroupSettingMenu = () => {
  const [deleteTenantGroup, getAll, setModalData] = useAdminPermManagerSelector((s) => [
    s.tenantGroupProcessor.deleteTenantGroup,
    s.tenantGroupProcessor.getAll,
    s.modalProcessor.setModalData,
  ]);

  const deleteFun = (nodeData: ITenantGroupEntity) => {
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async (close) => {
        try {
          await deleteTenantGroup(nodeData?.id!);
          message.success('删除成功！');
          getAll();
          close();
        } catch (error) {
          return false;
        }
      },
    });
  };

  const settingMenu = useMemo((): IMenuListProps<ITenantGroupEntity>['settingMenu'] => {
    return {
      items: ItemMenu,
      operationCallback: {
        onReNameCallback: (nodeData) => {
          setModalData({ type: 'rename', data: nodeData, open: true });
        },
        onDeleteCallback: (nodeData) => {
          deleteFun(nodeData);
        },
      },
    };
  }, [ItemMenu]);

  return settingMenu;
};
