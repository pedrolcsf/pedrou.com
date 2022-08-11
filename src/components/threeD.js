import {
  useState, useEffect, useRef, useCallback,
} from 'react';

// Three
import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from '../lib/model';

import { Container, ThreeDSpinner } from './threeDLoader';

function outCirc(x) {
  return Math.sqrt(1 - (x - 1) ** 4);
}

function ThreeD() {
  const refContainer = useRef();
  const [loading, setLoading] = useState();
  const [_camera, setCamera] = useState();
  const [renderer, setRenderer] = useState();
  const [target] = useState(new three.Vector3(0, 0.6, -0.5));
  const [initialCameraPosition] = useState(
    new three.Vector3(
      10 * Math.sin(0.2 * Math.PI),
      50,
      90 * Math.cos(0.2 * Math.PI),
    ),
  );

  const [scene] = useState(new three.Scene());
  const [_controls, setControls] = useState();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  useEffect(() => {
    const { current: container } = refContainer;
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new three.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = three.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      // 640 -> 240
      // 8   -> 6
      const scale = scH * 0.005 + 2;
      const camera = new three.OrthographicCamera(
        -scale,
        scale,
        1,
        -4.6,
        0.01,
        50000,
      );
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      setCamera(camera);

      const pointLight = new three.PointLight(0xffffff);
      pointLight.position.set(12, 6, 8);

      const ambientLight = new three.AmbientLight(0xffffff);
      ambientLight.position.set(3, 6, 4);

      scene.add(pointLight, ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      setControls(controls);

      loadGLTFModel(scene, '/logo-sem-luzes.glb', {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      let req = null;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -outCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 10;
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, []);

  // Resize for threed work in different windows
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <Container ref={refContainer}>{loading && <ThreeDSpinner />}</Container>
  );
}

export default ThreeD;
