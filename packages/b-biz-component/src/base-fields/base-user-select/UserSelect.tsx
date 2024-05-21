import { EFieldType, IColumnUserConfig, IUserEntity } from '@brick/types';
import { Dropdown, Select } from 'antd';
import React, { FC, UIEventHandler, useEffect, useMemo, useState } from 'react';
import { queryUser } from '@brick/services';
import { IBaseFieldFileProps } from '../base-field-file';
import { IBaseFieldProps } from '../types';

type IUserList = {
  label: string;
  value: string;
};

export interface IColumnUserProps extends IBaseFieldProps<EFieldType.USER> {
  //   /**
  //  * 占位符
  //  */
  // placeholder?: string;
  // /**
  //  *  1.普通 2.禁用 3.只读
  //  */
  // status: number;
  // /**
  //  * 默认值类型
  //  */
  // defaultValueType: string;
  // /**
  //  * 默认值
  //  */
  // defaultValue: string;
  // /**
  //  * 选择类型 1 单选 2 多选
  //  */
  // selectType: 'radio' | 'multi';
}

export const UserSelect: FC<IColumnUserProps> = (props) => {
  const {
    // selectType = 'multi',
    columnConfig,
    // placeholder,
    // status,
    // defaultValue,
    value,
    onChange = () => {},
  } = props;

  const { placeholder, defaultValue, status, selectType } = columnConfig || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [curUserList, setCurUserList] = useState([] as IUserList[]);
  // const [radioValue, setRadioValue] = useState('' as string | null);
  const [keywords, setKeywords] = useState('');
  // const [multiValue, setMultiValue] = useState([] as string[]);

  useEffect(() => {
    queryUser({ currentPage: 1, pageSize: 10 }).then((userList) => {
      setPages(userList?.pages);
      setCurrentPage(userList?.current);
      const preUserList = userList?.records?.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      setCurUserList(preUserList);
    });
  }, []);

  // const changeValue = (value: string | null | string[]) => {
  //   if (selectType == 1) {
  //     setRadioValue(value as string | null);
  //     if (onChange) {
  //       onChange(value);
  //     }
  //   } else {
  //     setMultiValue([...multiValue, ...value as string[]]);
  //     if (onChange) {
  //       onChange(value);
  //     }
  //   }
  // }

  console.log('selectType', selectType, 'defaultValue', defaultValue, 'value', value);

  useEffect(() => {
    // setRadioValue(null);
    // setMultiValue([]);
    if (selectType == 1) {
      onChange(null);
    } else {
      onChange([]);
    }
  }, [selectType]);

  const onScrollEnd: UIEventHandler<HTMLDivElement> = (e) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      if (currentPage < pages) {
        queryUser({ currentPage: currentPage + 1, pageSize: 10, keywords }).then((userList) => {
          const preUserList = userList?.records?.map((item) => {
            return {
              label: item.name,
              value: item.name,
            };
          });
          setCurUserList([...curUserList, ...preUserList]);
          setCurrentPage(userList?.current);
          setPages(userList?.pages);
        });
      }
    }
  };

  const onSelect = (curValue: string) => {
    console.log('onSelect', value);

    if (selectType == 1) {
      // setRadioValue(value);
      if (onChange) {
        onChange(curValue);
      }
    } else {
      // setMultiValue([...multiValue, value]);
      if (onChange) {
        onChange([...value, curValue]);
      }
    }
  };

  // useEffect(() => {
  //   onChange(value)
  // }, [JSON.stringify(value)]);

  useEffect(() => {
    onChange(defaultValue);
  }, [JSON.stringify(defaultValue)]);

  const onDeSelect = (value: string) => {
    if (selectType == 1) {
      if (onChange) {
        onChange(undefined);
      }
    } else {
      const preValue = [...value];
      preValue.splice(preValue.indexOf(value), 1);
      if (onChange) {
        onChange(preValue);
      }
    }
  };

  const onSearch = (keywords: string) => {
    setKeywords(keywords);
    queryUser({ currentPage: 1, pageSize: 10, keywords: keywords }).then((userList) => {
      const preUserList = userList?.records?.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      setCurUserList([...preUserList]);
      setCurrentPage(userList?.current);
      setPages(userList?.pages);
    });
  };

  const filterOption = () => true;

  return (
    <>
      <Select
        mode={selectType == 2 ? 'multiple' : 'tags'}
        value={value}
        style={{ width: '100%' }}
        onSearch={onSearch}
        defaultValue={defaultValue}
        onPopupScroll={onScrollEnd}
        filterOption={filterOption}
        placeholder={placeholder}
        onSelect={onSelect}
        onDeselect={onDeSelect}
        disabled={status === 2 || status === 3}
        options={curUserList}
        // dropdownStyle={{maxHeight: 200, overflowY: 'auto'}}
      />
    </>
  );
};
