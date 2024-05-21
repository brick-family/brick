import React, { FC, useEffect, useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useMemoizedFn } from 'ahooks';
import { Editor } from '@tinymce/tinymce-react';

// import s from './richEditor.less';
export interface IRichEditorProps {
  onChange?: (content: string) => void;
  initialValue?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
}

export const BRichEditor: FC<IRichEditorProps> = ({
  onChange,
  initialValue,
  value,
  placeholder,
  disabled,
  height = 360,
}) => {
  const editorRef = useRef<TinyMCEEditor>();

  const onInit = (evt: any, editor: TinyMCEEditor) => {
    editorRef.current = editor;
  };

  const onEditorChange = useMemoizedFn((e: any, editor: TinyMCEEditor) => {
    onChange?.(editor?.getContent());
  });

  useEffect(() => {
    editorRef?.current?.setContent(initialValue!);
  }, [initialValue]);

  return (
    <Editor
      tinymceScriptSrc={'http://101.42.26.70/tinymce/tinymce.js'}
      onInit={onInit}
      // initialValue={initialValue}
      onChange={onEditorChange}
      disabled={disabled}
      init={{
        height,
        placeholder: placeholder,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
