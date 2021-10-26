const Credits = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        marginRight: 15,
        marginBottom: 15,
        padding: '1em',
        width: 350,
        color: '#fff',
        fontSize: 12,
        lineHeight: 1.2,
      }}
    >
      <p>
        ISS 3D Tracking by Miguel Orrego (
        <a
          href="https://github.com/maoc06/ISS_3D_tracking"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
        )
      </p>
    </div>
  );
};

export default Credits;
