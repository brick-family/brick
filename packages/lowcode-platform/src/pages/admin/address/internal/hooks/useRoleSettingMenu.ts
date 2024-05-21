import { useMemo } from 'react';
import { IMenuListProps } from '@/components';
import { SETTING_MENU_MAP } from '@/constanst';
import { message, Modal } from 'antd';
import { IRoleEntity, TMenuData } from '@brick/types';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';
// 普通项菜单
const ItemMenu = [SETTING_MENU_MAP.rename, SETTING_MENU_MAP.delete];

export const useRoleSettingMenu = () => {
  const [requestRoleListAll, deleteRole, setModalData] = useInternalSelector((s) => [
    s.roleProcessor.requestRoleListAll,
    s.roleProcessor.deleteRole,
    s.modalProcessor.setModalData,
  ]);

  const deleteFun = (nodeData: TMenuData<IRoleEntity>) => {
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async (close) => {
        try {
          await deleteRole(nodeData?.id! || nodeData?.key?.toString());
          message.success('删除成功！');
          requestRoleListAll();
          close();
        } catch (error) {
          return false;
        }
      },
    });
  };

  const settingMenu = useMemo((): IMenuListProps<TMenuData<IRoleEntity>>['settingMenu'] => {
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
