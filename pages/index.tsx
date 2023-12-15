import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { NextPage } from 'next';
import DroppedItem from '@components/DroppedItem';
import { uploadImage } from '@libs/axiosManager';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);

  overflow: hidden;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 1024px;
  padding: 50px 20px 0px 20px;
  height: 100%;

  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

const MainTitle = styled.img`
  width: 100%;
  z-index: 1;
`;

const MainTrashBox = styled.div`
  position: relative;
  width: 100%;

  .trash {
    vertical-align: bottom;

    width: 100%;
  }

  .trash-front {
    position: absolute;
    left: 0;
    top: 0;
    vertical-align: bottom;

    width: 100%;

    z-index: 1;
  }

  input {
    display: none;
  }
`;

const MainPage: NextPage = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileImagesInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const onClickImages = () => {
    fileImagesInput.current?.click();
  };

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push('/video');
  };

  return (
    <MainLayout>
      <MainBox>
        <MainTitle src="/images/typo.png" />
        <MainTrashBox onClick={onClickImages}>
          <img className="trash" src="/images/trash.png" alt="" />
          <img className="trash-front" src="/images/trash-front.png" alt="" />
          <input
            ref={fileImagesInput}
            className="image__input"
            name="imageUpload"
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            multiple
            style={{ display: 'none' }}
          />
          <DroppedItem type={'file'} />
          <DroppedItem type={'file'} />
          <DroppedItem type={'file'} />
          <DroppedItem type={'paper'} />
          <DroppedItem type={'paper'} />
          <DroppedItem type={'paper'} />
        </MainTrashBox>
      </MainBox>
    </MainLayout>
  );
};

export default MainPage;
