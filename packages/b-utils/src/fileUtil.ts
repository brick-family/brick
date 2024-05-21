import { IFileEntity, ITenantFileEntity } from '@brick/types';
import { UploadProps } from 'antd';

/**
 *  根据上传文件的响应获取文件id
 * @param files
 */
export const getFileIdByAntdFiles = (files: UploadProps['fileList']) => {
  // @ts-ignore
  if (files?.[0]?.id) {
    // @ts-ignore
    return files?.[0]?.id;
  }
  if (files?.[0]?.response) {
    return files?.[0]?.response?.id;
  }

  return null;
};

export const getAntdFilesByTenantFile = (file: ITenantFileEntity & { id?: string }) => {
  if (file) {
    return [
      {
        id: file.id,
        uid: '-1',
        name: file.name,
        status: 'done',
        url: file.url,
        size: file.size,
        thumbUrl: file.url,
      },
    ];
  }

  return [];
};

export const getAntdFilesByFile = (file: IFileEntity) => {};
