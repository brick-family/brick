import { Request } from '@brick/utils';

export interface IUploadAppFileDto {
  file: any;
}

export async function uploadAppFile(uploadAppFileDto: IUploadAppFileDto) {
  return Request.upload('/app/file/upload', uploadAppFileDto);
}

export async function uploadTenantFile11(uploadAppFileDto: IUploadAppFileDto) {
  return Request.post<boolean>('/app/tenant/file/upload', uploadAppFileDto);
}

export async function downloadTenantFile11() {
  return Request.get('/resource/perm/unbind/export');
}
