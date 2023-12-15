import { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getRequest } from '@libs/axiosManager';
import { S3Data } from '@interfaces/index';

const DownloadLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  overflow: scroll;
`;

const DownloadList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  width: 100%;
`;

const DownloadItem = styled.li`
  width: 100%;
  height: 100px;

  img {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }
`;

const DownloadPage: NextPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const { data } = useQuery('', () => getRequest<S3Data[]>('/file?bucket=picktalk-backend'), {
    onSuccess: (data) => {
      const result = data
        .filter((v) => v.Key.includes('digital-trash/images/') && v.Size > 0)
        .sort((a, b) => (a.LastModified > b.LastModified ? -1 : 1))
        .map((v) => v.Key);

      setImages(result);
    },
  });

  return (
    <DownloadLayout>
      <DownloadList>
        {images.map((src, index) => {
          return (
            <DownloadItem key={src + index}>
              <a href={`https://d3f788chbiflqn.cloudfront.net/${src}`} download>
                <img src={`https://d3f788chbiflqn.cloudfront.net/${src}`} alt="" />
              </a>
            </DownloadItem>
          );
        })}
      </DownloadList>
    </DownloadLayout>
  );
};

export default DownloadPage;
