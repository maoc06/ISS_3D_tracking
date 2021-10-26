/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { useLoading } from '../../lib/loading';
import useApi from '../../hooks/useApi';
import issLocation from '../../api/iss-now';
import calcPosFromLatLonRad from '../../utils/calcPosFromLatLong';

const Template = () => {
  //Groups
  const iss = new THREE.Group();
  const earth = new THREE.Group();

  const mountRef = useRef(null);
  const loading = useLoading();

  const [issInfo, setIssInfo] = useState({
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    velocity: 0.0,
  });
  const getIssLocationNow = useApi(issLocation.getIssLocationNow);

  const getIssLocation = async () => {
    const issLocation = await getIssLocationNow.request();
    const { altitude, latitude, longitude, velocity } = issLocation.data;

    setIssInfo({ altitude, latitude, longitude, velocity });

    const pos = calcPosFromLatLonRad({
      lat: latitude,
      lon: longitude,
      radius: 1,
    });

    iss.position.set(pos.x, pos.y, pos.z);
  };

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(3, 3, 3);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //Interval update position
    const interval = setInterval(() => getIssLocation(), 5000);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    //Draco Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');

    //GLTF Loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    //ISS Model
    gltfLoader.load(
      './models/iss/issDraco.gltf',
      (gltf) => {
        gltf.scene.scale.set(0.02, 0.02, 0.02);
        iss.add(gltf.scene);
        scene.add(iss);
      },
      () => {
        loading.navigate(true);
      }
    );

    //Earth Model
    gltfLoader.load(
      './models/earth/earthDraco.gltf',
      (gltf) => {
        gltf.scene.scale.set(0.02, 0.02, 0.02);
        gltf.scene.rotateY(-4.7);
        earth.add(gltf.scene);
        scene.add(earth);
        loading.navigate(false);
      },
      () => {
        loading.navigate(true);
      },
      () => {
        loading.navigate(false);
      }
    );

    //Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(6, 6, 6);
    scene.add(pointLight);

    //Animate the scene
    const animate = () => {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      currentRef.removeChild(renderer.domElement);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className="Contenedor3D"
        ref={mountRef}
        style={{ width: '100%', height: '100vh' }}
      ></div>

      {!loading.loading && (
        <section
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            marginRight: 15,
            marginTop: 15,
            padding: '1em',
            width: 148,
            color: '#000',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '.5em',
            fontSize: 12,
            lineHeight: 1.2,
          }}
        >
          <p>
            <strong>Current Location:</strong>
          </p>
          <span>{`${issInfo.latitude.toFixed(4)}, ${issInfo.longitude.toFixed(
            4
          )}`}</span>

          <br />
          <br />

          <p>
            <strong>Current Altitude:</strong>
          </p>
          <span>{`${issInfo.altitude.toFixed(4)} Km`}</span>

          <br />
          <br />

          <p>
            <strong>Current Velocity:</strong>
          </p>
          <span>{`${issInfo.velocity.toFixed(4)} Km/h`}</span>
        </section>
      )}
    </>
  );
};

export default Template;
