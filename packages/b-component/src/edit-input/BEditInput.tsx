import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, message, Tooltip } from 'antd';
import { useClickAway } from 'ahooks';
import { EditOutlined } from '@ant-design/icons';
import s from './editInput.less';

export interface IBEditInputProps {
  /**
   * 显示的名称
   */
  name?: string;
  /**
   * 保存方法
   */
  onSave: (name: string) => Promise<boolean>;
}

export const BEditInput: FC<IBEditInputProps> = (props) => {
  const [name, setName] = useState(props.name);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const ref = useRef(null);
  const handleSave = async () => {
    const res = await props?.onSave(name!);
    if (res) {
      setIsEdit(false);
    } else {
      message.error('操作失败！');
    }
  };

  useClickAway(() => {
    if (isEdit) {
      handleSave();
    }
  }, ref);

  const handelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div className={s.edit} ref={ref}>
      {isEdit ? (
        <Input value={name} onChange={handleChange} onPressEnter={() => handleSave()} />
      ) : (
        <Tooltip title={name}>
          <div className={s.name}>
            <div className={s.text}>{name}</div>
            <EditOutlined onClick={handelEdit} />
          </div>
        </Tooltip>
      )}
    </div>
  );
};
