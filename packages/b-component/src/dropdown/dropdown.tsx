import { Dropdown, DropdownProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { FC } from 'react';

export interface IBDropdownProps extends DropdownProps {
  items: ItemType[];
}

export const BDropdown: FC<IBDropdownProps> = ({ items, ...ohterProps }) => {
  // const items: MenuProps['items'] = [
  //   {
  //     key: '1',
  //     label: (
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
  //         1st menu item
  //       </a>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
  //         2nd menu item (disabled)
  //       </a>
  //     ),
  //     icon: <SmileOutlined />,
  //     disabled: true,
  //   },
  //   {
  //     key: '3',
  //     label: (
  //       <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
  //         3rd menu item (disabled)
  //       </a>
  //     ),
  //     disabled: true,
  //   },
  //   {
  //     key: '4',
  //     danger: true,
  //     label: 'a danger item',
  //   },
  // ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" {...ohterProps}>
      <a onClick={(e) => e.preventDefault()}>
        {/* <Space>
          <>
            Hover me
            <DownOutlined />
          </>
        </Space> */}
      </a>
    </Dropdown>
  );
};
