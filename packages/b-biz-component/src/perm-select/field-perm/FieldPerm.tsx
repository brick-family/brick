import React, { FC, useEffect } from 'react';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';

import { usePermSelectSelector } from '@brick/biz-component';

import s from './fieldPerm.less';

export interface IFieldPermProps {}

export const FieldPerm: FC<IFieldPermProps> = (props) => {
  const [getTable, table, data, setData, setDataObservable] = usePermSelectSelector((s) => [
    s.getTable,
    s.table,
    s.data,
    s.setData,
    s.setDataObservable,
  ]);

  useEffect(() => {
    getTable();
  }, []);

  const viewFieldChange = (e: any, fieldId: string) => {
    const checked = e.target.checked;
    // 不能直接修改data原值
    let viewFiledIds = [...data.fieldPerm.viewFiledIds];
    if (checked) {
      !viewFiledIds.includes(fieldId) && viewFiledIds.push(fieldId);
    } else {
      viewFiledIds = _.without(viewFiledIds, fieldId);
    }
    setDataObservable((draft) => {
      draft.fieldPerm.viewFiledIds.set([...viewFiledIds]);
    });
  };

  const editFieldChange = (e: any, fieldId: string) => {
    const checked = e.target.checked;
    // 不能直接修改data原值
    let viewFiledIds = [...data.fieldPerm.editFiledIds];
    if (checked) {
      !viewFiledIds.includes(fieldId) && viewFiledIds.push(fieldId);
    } else {
      viewFiledIds = _.without(viewFiledIds, fieldId);
    }
    setDataObservable((draft) => {
      draft.fieldPerm.editFiledIds.set([...viewFiledIds]);
    });
  };

  return (
    <div>
      <div className={s.list}>
        <div className={classNames(s.header, s.item)}>
          <div className={s.one}>字段</div>
          <div className={s.two}>可见</div>
          <div className={s.three}>可编辑</div>
        </div>
        <div className={s.body}>
          {table?.columns?.map((c) => {
            return (
              <div className={s.item} key={c.id}>
                <div className={s.one}>{c.title}</div>
                <div className={s.two}>
                  <Checkbox
                    onChange={(e) => viewFieldChange(e, c.id!)}
                    checked={data.fieldPerm?.viewFiledIds?.includes(c.id!)}
                  />
                </div>
                <div className={s.three}>
                  <Checkbox
                    onChange={(e) => editFieldChange(e, c.id!)}
                    checked={data.fieldPerm?.editFiledIds?.includes(c.id!)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
