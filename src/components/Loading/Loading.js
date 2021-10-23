import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../animations/loading.json';

const Loading = ({ visible = false }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'rgba(0, 0, 0, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Lottie options={defaultOptions} height={200} width={200} />
      <h4 style={{ color: 'white', textAlign: 'center' }}>
        We are loading the information,
        <br />
        this may take a few seconds, please wait...
      </h4>
    </div>
  );
};

export default Loading;
