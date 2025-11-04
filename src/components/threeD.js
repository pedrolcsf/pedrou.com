import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Box } from '@chakra-ui/react';

import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from '../lib/model';

import { Container, ThreeDSpinner } from './threeDLoader';
import ThreeDControls from './threeDControls';

function outCirc(x) {
  return Math.sqrt(1 - (x - 1) ** 4);
}

function ThreeD() {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [controls, setControls] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [target] = useState(new three.Vector3(0, 0.6, -0.5));
  const [initialCameraPosition] = useState(
    new three.Vector3(
      10 * Math.sin(0.2 * Math.PI),
      50,
      90 * Math.cos(0.2 * Math.PI),
    ),
  );

  const [scene] = useState(new three.Scene());

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
      const scale = scH * 0.005;
      const camera = new three.OrthographicCamera(
        -scale - 1,
        scale + 1,
        1,
        -3,
        -1,
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
      controls.autoRotateSpeed = 1.5;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 50;
      controls.maxDistance = 150;
      controls.target = target;
      setControls(controls);

      let interactionTimeout;
      const isUserInteractingRef = { current: false };
      let interactionEndTimeout;

      const handleInteractionStart = () => {
        isUserInteractingRef.current = true;
        setIsInteracting(true);
        renderer.domElement.style.cursor = 'grabbing';
        controls.autoRotate = false;
        clearTimeout(interactionTimeout);
        clearTimeout(interactionEndTimeout);
      };

      const handleInteractionEnd = () => {
        isUserInteractingRef.current = false;
        renderer.domElement.style.cursor = 'grab';
        clearTimeout(interactionTimeout);
        clearTimeout(interactionEndTimeout);
        interactionEndTimeout = setTimeout(() => {
          if (!isUserInteractingRef.current && controls) {
            setIsInteracting(false);
            controls.autoRotate = true;
            controls.update();
          }
        }, 2000);
      };

      renderer.domElement.style.cursor = 'grab';
      renderer.domElement.addEventListener('mousedown', handleInteractionStart);
      renderer.domElement.addEventListener('mouseup', handleInteractionEnd);
      renderer.domElement.addEventListener('mouseleave', () => {
        renderer.domElement.style.cursor = 'grab';
        handleInteractionEnd();
      });
      renderer.domElement.addEventListener('wheel', (e) => {
        handleInteractionStart();
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          handleInteractionEnd();
        }, 1500);
      });

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
          if (!isUserInteractingRef.current && controls) {
            controls.autoRotate = true;
          }
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        if (renderer) {
          renderer.dispose();
        }
        clearTimeout(interactionTimeout);
        clearTimeout(interactionEndTimeout);
      };
    }
  }, []);

  const handleReset = useCallback(() => {
    if (camera && controls) {
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      controls.target.copy(target);
      controls.update();
      setIsInteracting(false);
      setTimeout(() => {
        if (controls) {
          controls.autoRotate = true;
        }
      }, 500);
    }
  }, [camera, controls, initialCameraPosition, target]);

  // Resize for threed work in different windows
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <Box position="relative" w="100%" h="100%">
      <Container ref={refContainer}>
        {loading && <ThreeDSpinner />}
      </Container>
      {!loading && (
        <ThreeDControls onReset={handleReset} isInteracting={isInteracting} />
      )}
    </Box>
  );
}

export default ThreeD;
