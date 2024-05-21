import { Request } from '@brick/utils';

export interface IUploadTenantFileDto {
  file: any;
}

export async function uploadTenantFile(
  uploadTenantFileDto: IUploadTenantFileDto,
) {
  return Request.upload('/tenant/file/upload', uploadTenantFileDto);
}

export async function downloadTenantFile() {
  return Request.get('/resource/perm/unbind/export');
}
