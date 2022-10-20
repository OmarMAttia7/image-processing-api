import mime from 'mime-types';

function getContentType(extension: string): string {
  const contentType = mime.lookup(extension);

  if (contentType === false) throw Error("Unsupported file extension");

  return contentType;
}

export default getContentType;