import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
type FileUploaderProps = {
  fieldChange: React.Dispatch<React.SetStateAction<File[]>>;
  mediaUrl: string;
};
const ProfileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      fieldChange(acceptedFiles);
      setUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [files]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.gif', '.webp', '.svg'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {url ? (
        <div className="flex items-center gap-3 px-3 ">
          <img
            src={url}
            className="sm:h-[120px] sm:w-[120px] h-[80px] w-[80px]  object-cover rounded-full"
            alt=""
            loading="lazy"
          />
          <button
            type="button"
            className="px-3 py-2 text-orange-500 rounded  sm:px-5 sm:py-4 hover:bg-orange-500 hover:bg-opacity-10"
          >
            Change Profile
          </button>
        </div>
      ) : (
        <div className="rounded-lg bg-white bg-opacity-10 flex flex-col justify-center items-center h-[300px] gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            version="1.1"
            viewBox="0 0 30 30"
            xmlSpace="preserve"
          >
            <path
              fill="rgba(255,255,255,0.2)"
              d="M24.3 11.8c-.1-.2-.4-.3-.6-.3-.3 0-.5.1-.6.3l-3.7 5.1-2.1-2.5c-.1-.2-.4-.3-.6-.3-.2 0-.4.1-.6.3L9 23.2c-.3.3-.2.8.1 1.1.1.1.3.2.5.2s.4-.1.6-.3l6.5-8.1 2.2 2.6c.1.2.4.3.6.3.2 0 .4-.1.6-.3l3.6-5 2.4 3.5c.2.3.7.4 1 .2.3-.2.4-.7.2-1l-3-4.6zM5.5 5.2H23c.4 0 .8-.3.8-.8s-.4-.7-.8-.7H5.5C2.1 3.7.1 5.7.1 9.1v10.3c0 .4.3.8.8.8s.8-.3.8-.8V9.1c-.1-2.6 1.2-3.9 3.8-3.9zm20.6.4H6c-2.1 0-3.8 1.7-3.8 3.8v13.2c0 2.1 1.7 3.8 3.8 3.8h20.1c2.1 0 3.8-1.7 3.8-3.8V9.4c0-2.1-1.7-3.8-3.8-3.8zm2.3 17c0 1.2-1 2.3-2.3 2.3H6c-1.2 0-2.3-1-2.3-2.3V9.4c0-1.2 1-2.3 2.3-2.3h20.1c1.2 0 2.3 1 2.3 2.3v13.2zm-15.7-9.1c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3 0 1.6 1.3 3 3 3s3-1.4 3-3zm-4.4 0c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z"
            ></path>
          </svg>
          <h2 className="text-xl text-white">Drag photo here</h2>
          <p className="text-[rgba(255,255,255,0.3)]">SVG PNG JPG</p>
          <button
            type="button"
            className="px-5 py-3 bg-white rounded bg-opacity-10"
          >
            Click or drag photo here
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileUploader;
