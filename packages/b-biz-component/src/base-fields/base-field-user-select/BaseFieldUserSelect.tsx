import { EFieldType } from '@brick/types';
import { Select } from 'antd';
import React, { FC, UIEventHandler, useEffect, useState } from 'react';
import { queryUser } from '@brick/services';
import { IBaseFieldProps } from '../types';

type IUserList = {
  label: string;
  value: string;
};

export interface IBaseFieldUserSelectProps extends IBaseFieldProps<EFieldType.USER> {}

export const BaseFieldUserSelect: FC<IBaseFieldUserSelectProps> = (props) => {
  const {
    // selectType = 'multi',
    columnConfig,
    // placeholder,
    // status,
    // defaultValue,
    value,
    onChange = () => {},
  } = props;

  const { placeholder, defaultValue, status, selectType, defaultValueType } = columnConfig || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [curUserList, setCurUserList] = useState([] as IUserList[]);
  // const [radioValue, setRadioValue] = useState('' as string | null);
  const [keywords, setKeywords] = useState('');
  // const [multiValue, setMultiValue] = useState([] as string[]);

  useEffect(() => {
    queryUser({ currentPage: 1, pageSize: 10 })
      .then((userList) => {
        setPages(userList?.pages);
        setCurrentPage(userList?.current);
        const preUserList = userList?.records?.map((item) => {
          return {
            label: item.name,
            value: item.name,
          };
        });
        setCurUserList(preUserList);
      })
      .then(() => {
        let preValue = '' as string | string[];
        onChange(value || defaultValue);
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
    if (curUserList.length > 0) {
      if (selectType == 1) {
        onChange(null);
      } else {
        onChange([]);
      }
    }
  }, [selectType]);

  const onScrollEnd: UIEventHandler<HTMLDivElement> = (e: any) => {
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
    <Select
      mode={selectType == 2 ? 'multiple' : undefined}
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
  );
};
