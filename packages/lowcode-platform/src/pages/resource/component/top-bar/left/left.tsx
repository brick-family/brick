import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styles from './left.less';
import { history } from '@brick/utils';
import { BEditInput } from '@brick/component';
import { IconSelect } from '@brick/biz-component';
import { useResourcePageSelector } from '../../../resource-page-processor';
import { useMatch, useParams } from '@umijs/max';

export interface ILeftProps {}

interface IAppName {
  name: string;
  icon: any;
}

const AppName = (props: IAppName) => {
  const { name } = props;
  const { resourceId, aId } = useParams();
  const handleClick = () => {
    history.push(`/app/${aId}/${resourceId}`);
  };

  return (
    <Tooltip title={name}>
      <div className={styles.app} onClick={handleClick}>
        <IconSelect
          defaultSelectFirst={false}
          readonly
          type="app"
          size={30}
          style={{ marginRight: 0, marginLeft: 2, borderRadius: 4 }}
          data={props.icon}
        />
        <div className={styles.name}>{name}</div>
      </div>
    </Tooltip>
  );
};

interface ITableName {
  name: string;
}

const TableName = (props: ITableName) => {
  const [resourceData, updateResource, setResourceObserver] = useResourcePageSelector((s) => [
    s.resourceData,
    s.resourceProcessor?.updateResource,
    s.setResourceObserver,
  ]);

  const handleSave = async (name: string) => {
    const result = await updateResource({
      title: name,
      id: resourceData?.id,
      resourceType: resourceData?.resourceType!,
      applicationId: resourceData?.applicationId, // TODO 可以去掉
    });
    if (result) {
      // 更新本地数据
      setResourceObserver((draft) => {
        draft.title.set(name);
      });
    }

    return result;
  };

  return <BEditInput name={props.name} onSave={handleSave} />;
};

export const Left: FC<ILeftProps> = (props) => {
  const [tableData, appData] = useResourcePageSelector((s) => [s.resourceData, s.appData]);
  return (
    <>
      <AppName name={appData?.name!} icon={appData?.extraParam?.icon} />
      <RightOutlined style={{ fontSize: 13 }} />
      <TableName name={tableData?.title!} />
    </>
  );
};
