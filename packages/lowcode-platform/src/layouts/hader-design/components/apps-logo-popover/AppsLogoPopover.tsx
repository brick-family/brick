import { Button, Drawer, Popover } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import { AppsLogo } from '../apps-logo/AppsLogo';
import { history, useParams } from 'umi';
import { CheckCard } from '@ant-design/pro-components';
import {
  CloseOutlined,
  HomeOutlined,
  DoubleRightOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import { IconSelect } from '@brick/biz-component';
import { useHeaderDesignSelector } from '../../header-design-processor';
import s from './appLogoPopover.less';
import { useGlobalSelector } from '@/global-processor';
import { AppButton } from './AppButton';

export interface IAppsLogoPopoverProps {}

export const AppsLogoPopover: FC<IAppsLogoPopoverProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { aId } = useParams();

  const [queryApplication, queryApplicationResponse] = useHeaderDesignSelector((s) => [
    s.appProcessor.queryApplication,
    s.appProcessor.queryApplicationResponse,
  ]);

  const onChange = (value: string) => {
    console.log('q=>value', value);
    if (value) {
      history.push(`/app/${value}/home`);
      window.location.reload();
    }
  };

  const content = (
    <div className={s.content}>
      {queryApplicationResponse?.data?.records?.map((item) => {
        return (
          <CheckCard
            title={item.name}
            // size="small"
            value={item.id}
            checked={item.id === aId}
            // onChange={onChange}
            onClick={() => onChange(item.id!)}
            avatar={
              <IconSelect
                defaultSelectFirst={false}
                readonly
                type="app"
                data={item?.extraParam?.icon}
              />
            }
          />
        );
      })}
    </div>
  );
  const onOpenChange = (open: boolean) => {
    if (open) {
      queryApplication({ currentPage: 1, pageSize: 1000 });
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    // history.push('/');
    setOpen(true);
  };
  const renderTitle = () => {
    return (
      <Button
        onClick={() => {
          history.push('/');
        }}
        type="primary"
        ghost
        icon={<HomeOutlined />}
      >
        工作台
      </Button>
    );
  };
  const renderExtra = () => {
    return (
      <Button
        type="text"
        onClick={() => setOpen(false)}
        icon={<CloseOutlined />}
        size="small"
      ></Button>
    );
  };
  return (
    <>
      <Drawer
        className={s.drawer}
        title={renderTitle()}
        placement={'left'}
        onClose={onClose}
        closeIcon={false}
        extra={renderExtra()}
        // width={250}
        afterOpenChange={onOpenChange}
        open={open}
      >
        {content}
      </Drawer>
      <div onClick={handleClick}>
        <AppButton />
      </div>
    </>
  );
};
