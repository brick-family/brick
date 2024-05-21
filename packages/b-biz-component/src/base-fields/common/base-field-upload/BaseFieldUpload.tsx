import React, { FC, useEffect, useState } from 'react';
import { IBaseFieldProps } from '@brick/biz-component';
import { EColumnSelectType, EColumnUploadType, EFieldType, IFileEntity } from '@brick/types';
import { Button, Upload, UploadFile, UploadProps } from 'antd';
import { useCreation } from 'ahooks';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { CardContent } from './card-content';
import { uploadAppFile } from '@brick/services';
import classNames from 'classnames';
import s from './baseFieldUpload.module.less';

export interface IBaseFieldUploadProps extends IBaseFieldProps<EFieldType.FILE | EFieldType.IMAGE> {
  uploadProps: UploadProps;
  type: 'file' | 'image';
}

export const BaseFieldUpload: FC<IBaseFieldUploadProps> = (props) => {
  const { style, className, columnConfig, uploadProps, value, onChange, type } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const isFile = type === 'file';

  useEffect(() => {
    // 转换
    if (Array.isArray(value)) {
      const newValue = (value as IFileEntity[])?.map((item) => {
        return {
          uid: item.id,
          name: item.originName,
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
          response: item,
        };
      });
      setFileList(newValue as unknown as UploadFile[]);
    }
  }, [value]);

  const maxCount = useCreation(() => {
    if (columnConfig?.selectType === EColumnSelectType.single) return 1;

    return columnConfig?.maxCount || 1;
  }, [columnConfig?.selectType, columnConfig?.maxCount]);

  const uploadContent = () => {
    if (columnConfig?.uploadType === EColumnUploadType.click) {
      return (
        <Button disabled={uploadProps?.disabled} icon={<UploadOutlined />}>
          {columnConfig?.uploadText}
        </Button>
      );
    }
    if (columnConfig?.uploadType === EColumnUploadType.card) {
      return <CardContent columnConfig={columnConfig} fileList={fileList} />;
    }
  };

  const customRequest: UploadProps['customRequest'] = async (props) => {
    const { onError, onSuccess, file, data, filename } = props;
    // console.log('q=>customRequest', file);
    try {
      const res = await uploadAppFile({
        file: file,
      });
      onSuccess?.(res);
    } catch (e: any) {
      console.error('logo file upload', e);
      onError?.(e);
    }
  };

  const currUploadProps = {
    customRequest: customRequest,
    // action: '/api/app/file/upload',
    // headers: getRequestHeader(),
    multiple: columnConfig?.selectType === EColumnSelectType.multiple,
    // maxCount: maxCount,
    disabled: uploadProps.disabled,
    fileList: fileList,
    onChange({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) {
      console.log(file, fileList);
      // 把成功的内容报错服务端
      setFileList(fileList);
      if (file.status !== 'uploading') {
        const resultIds: Array<string> = [];
        fileList.forEach((file) => {
          if (file.response && file.response.id) {
            resultIds.push(file.response.id);
          }
        });
        onChange?.(resultIds.join(','));
      }
    },
  };

  if (columnConfig?.uploadType === EColumnUploadType.drag) {
    return (
      <Upload.Dragger className={className} {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖动文件到虚线框内</p>
        <p className="ant-upload-hint">{isFile ? '支持所有类型的文件' : '支持image/*类型的文件'}</p>
        {}
      </Upload.Dragger>
    );
  }
  return (
    <Upload
      style={style}
      className={classNames(s.fieldImage, className)}
      {...currUploadProps}
      listType={columnConfig?.uploadType === EColumnUploadType.card ? 'picture-card' : 'text'}
    >
      {uploadContent()}
    </Upload>
  );
};
