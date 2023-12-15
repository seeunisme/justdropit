import { useRouter } from 'next/router';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  background-color: #000;
`;

const VideoBox = styled.video`
  max-height: 100%;
  max-width: 100%;
`;

const VideoPage: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;

    videoRef.current.play();
  }, []);

  return (
    <VideoLayout>
      <VideoBox ref={videoRef} autoPlay playsInline onEnded={() => router.push('/')}>
        <source src={`/video/${Math.floor(Math.random() * 2) + 1}.mp4`} />
      </VideoBox>
    </VideoLayout>
  );
};

export default VideoPage;
