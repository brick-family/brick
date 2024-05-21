import React, { FC, useEffect, useRef, useState } from 'react';
// @ts-ignore
import { IRichEditorRef, RichEditor } from '@brick/rich-editor';
import { useMemoizedFn } from 'ahooks';
import { Button } from 'antd';
import { BSortableList, ISortableBaseItem } from '@brick/component';

export interface IRichProps {}

const Rich: FC<IRichProps> = (props) => {
  const [value, setValue] = useState();
  const editorRef = useRef<IRichEditorRef>();
  const [items, setItems] = useState<ISortableBaseItem[]>([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const onSave = () => {
    localStorage.setItem('editor', JSON.stringify(value));
  };
  const onChange = useMemoizedFn((value) => {
    console.log('q=>value', value);

    setValue(value);
  });

  useEffect(() => {
    const v = localStorage.getItem('editor');
    if (v) {
      editorRef.current?.setValue(JSON.parse(v));
    }
  }, []);

  return (
    <div>
      <Button onClick={onSave}>保存</Button>
      {/*<BRichEditor onChange={onChange} />*/}
      <BSortableList
        items={items}
        onSort={setItems}
        renderItem={(item) => (
          <BSortableList.Item id={item.id}>
            <BSortableList.DragHandle />
            {JSON.stringify(item)}
          </BSortableList.Item>
        )}
      />

      {/*<RichEditor ref={editorRef} onChange={onChange} />*/}
    </div>
  );
};

export default Rich;
