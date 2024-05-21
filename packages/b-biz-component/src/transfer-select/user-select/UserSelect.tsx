import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CheckboxProps, TransferProps } from 'antd';
import { Checkbox, List, Skeleton, Transfer } from 'antd';
import { useTransferSelectSelector } from '../transfer-select-processor';
import { IUserEntity } from '@brick/types';
import _ from 'lodash';
import { BSearch } from '@brick/component';
import styles from '../transferSelect.less';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

//建立一个穿梭框的虚拟数据，只有两个item，key为0和1。为了控制穿梭框的向左向右穿越的箭头亮起来
const mockData: RecordType[] = Array.from({ length: 2 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  chosen: false, //chosen为了ts不报错
}));

export const UserSelect: React.FC = () => {
  const [
    userList,
    queryUser,
    sourceSelectKeys,
    targetSelectKeys,
    targetKeys,
    setSourceSelectKeys,
    setTargetSelectKeys,
    setTargetKeys,
    targetData,
    setTargetData,
    storeTargetData,
    setStoreTargetData,
    sourceKeywords,
    setSourceKeywords,
    targetKeywords,
    setTargetKeywords,
  ] = useTransferSelectSelector((s) => [
    s.userProcessor.queryUserResponse,
    s.userProcessor.queryUser,
    s.treeSelectKeys,
    s.targetSelectKeys,
    s.targetKeys,
    s.setTreeSelectKeys,
    s.setTargetSelectKeys,
    s.setTargetKeys,
    s.userTargetData,
    s.setUserTargetData,
    s.userStoreTargetData,
    s.setUserStoreTargetData,
    s.sourceKeywords,
    s.setSourceKeywords,
    s.targetKeywords,
    s.setTargetKeywords,
  ]);
  /// 第一步： 创建一个引用
  const refScrollBody = useRef<HTMLDivElement>(null);
  // const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [userListAll, setUserListAll] = useState([] as IUserEntity[]);
  // const [storeTargetData, setStoreTargetData] = useState([] as IUserEntity[])
  // const [targetData, setTargetData] = useState([] as IUserEntity[])
  const [mockSelectKeys, setMockSelectKeys] = useState([] as string[]);
  const [targetDataFiltered, setTargetDataFiltered] = useState([] as IUserEntity[]);

  const loadMoreData = () => {
    console.log('loadMoreData', userList);
    queryUser({ currentPage: page, pageSize: 10, keywords: targetKeywords }).then(() => {
      setUserListAll(userListAll.concat(userList.data.records));
    });
    setPage(page + 1);
  };

  console.log('queryUser', userList);

  useEffect(() => {
    setStoreTargetData(targetData);
    loadMoreData();
  }, []);

  useEffect(() => {
    console.log('targetKeywords', targetKeywords, '11');

    if (targetKeywords) {
      setTargetDataFiltered(targetData.filter((item) => item.name.includes(targetKeywords)));
    } else {
      setTargetDataFiltered(targetData);
    }
  }, [targetKeywords, JSON.stringify(targetData)]);

  const onChange: TransferProps['onChange'] = (newTargetKeys, direction, moveKeys) => {
    if (direction == 'right') {
      setTargetData(storeTargetData);
      setTargetKeys(storeTargetData.map((item) => item.id));
    } else {
      const nextTargetData = targetData.filter((item) => !targetSelectKeys.includes(item.id));
      setTargetData(nextTargetData);
      setStoreTargetData(nextTargetData);
      console.log('nextTargetData', nextTargetData);

      setSourceSelectKeys(nextTargetData.map((item) => item.id));
      setTargetKeys(nextTargetData.map((item) => item.id));
      setTargetSelectKeys([]);
    }
  };

  console.log('sourceSelectKeys', sourceSelectKeys);

  const onSourceCheck: CheckboxProps['onChange'] = (e) => {
    if (e?.target?.checked) {
      const nextStoreTargetData: IUserEntity[] = [...storeTargetData];
      const checkedItem: IUserEntity = userListAll.find((item) => item.id == e?.target?.value)!;
      nextStoreTargetData.push(checkedItem);
      setStoreTargetData(nextStoreTargetData);
      const nextSourceSelectKeys: string[] = [...sourceSelectKeys];
      nextSourceSelectKeys.push(e?.target?.value);
      setSourceSelectKeys(nextSourceSelectKeys);
      setTargetSelectKeys([]);
    } else {
      const nextStoreTargetData: IUserEntity[] = [...storeTargetData].filter(
        (item) => item.id != e?.target?.value
      );
      setStoreTargetData(nextStoreTargetData);
      const nextSourceSelectKeys: string[] = [...sourceSelectKeys].filter(
        (item) => item != e?.target?.value
      );
      setSourceSelectKeys(nextSourceSelectKeys);
    }
  };

  const onTargetCheck: CheckboxProps['onChange'] = (e) => {
    if (e?.target?.checked) {
      const nexTargetSelectKeys = [...targetSelectKeys];
      nexTargetSelectKeys.push(e.target.value);
      setTargetSelectKeys(nexTargetSelectKeys);
    } else {
      setTargetSelectKeys(targetSelectKeys.filter((item) => item != e.target.value));
    }
  };

  const onSourceSearch = (keywords: string) => {
    setPage(2);
    setSourceKeywords(keywords);
    queryUser({ currentPage: 1, pageSize: 10, keywords }).then(() => {
      setUserListAll(userList?.data?.records);
    });
    // if (direction == 'left') {
    //   setPage(2);
    //   setKeywords(keywords);
    //   queryUser({ currentPage: 1, pageSize: 10, keywords }).then(() => {
    //     setUserListAll(userList?.data?.records);
    //   });
    // } else {
    //   setTargetData(targetData.filter((item) => item?.id?.includes(keywords)));
    // }
  };

  const onTargetSearch = (keywords: string) => {
    console.log('keywoerds111222', keywords);

    setTargetKeywords(keywords);
  };

  //控制向左向右的箭头的disabled状态
  useEffect(() => {
    if (sourceSelectKeys?.length > 0 && targetSelectKeys.length > 0) {
      setMockSelectKeys(['0', '1']);
    }
    if (sourceSelectKeys?.length > 0) {
      setMockSelectKeys(['0']);
    } else if (targetSelectKeys.length > 0) {
      setMockSelectKeys(['1']);
    } else {
      setMockSelectKeys([]);
    }
    if (JSON.stringify(sourceSelectKeys) == JSON.stringify(targetKeys)) {
      console.log('targetSelectKeys222', targetSelectKeys);

      if (targetSelectKeys?.length > 0) {
        setMockSelectKeys(['1']);
      } else {
        setMockSelectKeys([]);
      }
    }
  }, [JSON.stringify(sourceSelectKeys), JSON.stringify(targetSelectKeys)]);

  console.log('targetSelectKeys_targetData', targetSelectKeys, targetKeys);

  return (
    <div className={`${styles.transfer_user}`}>
      <Transfer
        dataSource={mockData}
        targetKeys={['1']}
        selectedKeys={mockSelectKeys}
        onChange={onChange}
        filterOption={() => true}
      >
        {({ direction }) => {
          if (direction == 'left') {
            return (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '52px',
                  }}
                >
                  <BSearch
                    onSearch={onSourceSearch}
                    style={{ width: '90%' }}
                    placeholder="请输入关键字"
                  />
                </div>
                <div
                  ref={refScrollBody}
                  style={{
                    height: 320,
                    overflow: 'auto',
                    padding: '0 16px',
                    borderTop: '1px solid rgba(140, 140, 140, 0.35)',
                  }}
                >
                  {refScrollBody.current && (
                    <InfiniteScroll
                      dataLength={userListAll?.length || 0}
                      next={loadMoreData}
                      hasMore={userList?.data?.current < userList?.data?.pages}
                      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                      // endMessage={<Divider plain>{userList?.data?.total}</Divider>}
                      scrollableTarget={refScrollBody.current as any}
                    >
                      <List
                        dataSource={userListAll || []}
                        renderItem={(item) => (
                          <List.Item key={item.id} style={{ justifyContent: 'left' }}>
                            <Checkbox
                              value={item.id}
                              onChange={onSourceCheck}
                              disabled={targetKeys.includes(item.id)}
                              checked={sourceSelectKeys.includes(item.id)}
                            />
                            <div style={{ marginLeft: '5px' }}>{item.name}</div>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  )}
                </div>
              </>
            );
          } else {
            return (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '52px',
                  }}
                >
                  <BSearch
                    onSearch={onTargetSearch}
                    style={{ width: '90%' }}
                    placeholder="请输入关键字"
                  />
                </div>

                <List
                  style={{ borderTop: '1px solid rgba(140, 140, 140, 0.35)' }}
                  dataSource={targetDataFiltered}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      style={{ justifyContent: 'left', padding: '12px 16px' }}
                    >
                      <Checkbox
                        value={item.id}
                        onChange={onTargetCheck}
                        checked={targetSelectKeys.includes(item.id)}
                      />
                      <div style={{ marginLeft: '5px' }}>{item.name}</div>
                    </List.Item>
                  )}
                />
              </>
            );
          }
        }}
      </Transfer>
    </div>
  );
};
