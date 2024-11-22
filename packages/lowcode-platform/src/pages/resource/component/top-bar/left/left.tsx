import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styles from './left.less';
import { history } from '@brick/utils';
import { useLowcodeEditorSelector } from '@brick/lowcode-editor';
import { BEditInput } from '@brick/component';
import { IconSelect } from '@brick/biz-component';
import { useDesignSelector } from '../../../resource-page-processor';

export interface ILeftProps {}

interface IAppName {
  name: string;
  icon: any;
}

const AppName = (props: IAppName) => {
  const { name } = props;

  const handleClick = () => {
    // TODO history
    history.go(-1);
  };

  return (
    <Tooltip title={name}>
      <div className={styles.app} onClick={handleClick}>
        <IconSelect
          defaultSelectFirst={false}
          readonly
          type="app"
          size={20}
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
  const [resourceData, updateResource, setResourceObserver] = useDesignSelector((s) => [
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
  const [tableData, appData] = useDesignSelector((s) => [s.resourceData, s.appData]);
  console.log('q=>result-resource-left', tableData, appData);
  return (
    <div className={styles.left}>
      <AppName name={appData?.name!} icon={appData?.extraParam?.icon} />
      <RightOutlined style={{ fontSize: 13 }} />
      <TableName name={tableData?.title!} />
    </div>
  );
};
