import { useMemo } from 'react';
import { IMenuListProps } from '@/components';
import { EResourceType, IResourceEntity, TMenuData } from '@brick/types';
import { SETTING_MENU_MAP } from '@/constanst';
import { useSliderSelector } from '@/pages/app/sider/processor';
import { message, Modal } from 'antd';
import { deleteResource } from '@brick/services';
import { useParams } from '@umijs/max';

// 分组菜单
const GroupMenu = [
  SETTING_MENU_MAP.rename,
  SETTING_MENU_MAP.move,
  SETTING_MENU_MAP.createGroup,
  SETTING_MENU_MAP.line,
  SETTING_MENU_MAP.delete,
];

// 普通项菜单
const ItemMenu = [
  SETTING_MENU_MAP.rename,
  SETTING_MENU_MAP.copy,
  SETTING_MENU_MAP.move,
  SETTING_MENU_MAP.line,
  SETTING_MENU_MAP.delete,
];

export const useSliderMenuSetting = () => {
  const [setModalData, setResourceId, refresh] = useSliderSelector((s) => [
    s.modalProcessor.setModalData,
    s.setResourceId,
    s.resourceProcessor.refresh,
  ]);

  const { resourceId } = useParams();

  const getSettingMenu = (nodeData: TMenuData<IResourceEntity>) => {
    return nodeData?.resourceType === EResourceType.GROUP ? GroupMenu : ItemMenu;
  };

  const deleteFun = (nodeData: TMenuData<IResourceEntity>) => {
    if (nodeData?.children?.length > 0) {
      message.error('该分组下有内容，请删除内容后在删除分组！');
      return;
    }
    Modal.confirm({
      title: '确定要删除吗？',
      onOk: async (close) => {
        try {
          await deleteResource(nodeData?.id!);
          if (nodeData.id === resourceId) {
            setResourceId('home');
          }
          message.success('删除成功！');
          refresh?.();
          close();
        } catch (error) {
          return false;
        }
      },
    });
  };

  const settingMenu = useMemo((): IMenuListProps<TMenuData<IResourceEntity>>['settingMenu'] => {
    return {
      getItems: getSettingMenu,
      operationCallback: {
        onReNameCallback: (nodeData) => {
          setModalData({ type: 'rename', data: nodeData, open: true });
        },
        onMoveCallback: (nodeData) => {
          setModalData({ type: 'move', data: nodeData, open: true });
        },
        onDeleteCallback: (nodeData) => {
          deleteFun(nodeData);
        },
        onCreateGroupCallback: (nodeData) => {
          console.log('q=>nodeData', nodeData);
          setModalData({ type: 'create', data: nodeData, open: true });
        },
      },
    };
  }, [ItemMenu]);

  return { settingMenu };
};
