import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { reduced } from '../lib/motion.js';

// The grove in each season: sky, meadow, two leaf colours, two meadow colours, how many leaves
// are still on the trees, and how many are falling. Painted, not photographed: every leaf and
// every tuft of grass is one soft dab of colour, the way Monet built his poplars.
const LOOKS = {
  spring: {
    sky: '#d9dfd6', cloud: '#f3f1e6', ground: '#8f9a4c',
    leafA: '#7f9e3c', leafB: '#c2cf6a', grassA: '#879a43', grassB: '#e9e2b8',
    density: 0.62, fall: 0, trunk: '#d8d0b6'
  },
  summer: {
    sky: '#c6d3d2', cloud: '#f1efe4', ground: '#5e6f2c',
    leafA: '#34501e', leafB: '#6d8d36', grassA: '#5c7229', grassB: '#a8b25a',
    density: 1, fall: 0, trunk: '#cfc6aa'
  },
  autumn: {
    sky: '#e7d6ab', cloud: '#f6ecd2', ground: '#9e8640',
    leafA: '#c7841f', leafB: '#ecc458', grassA: '#a58a42', grassB: '#d7b768',
    density: 0.8, fall: 1, trunk: '#d6c9a6'
  },
  winter: {
    sky: '#ddd8c9', cloud: '#f3efe3', ground: '#c2a86b',
    leafA: '#8f6a33', leafB: '#c09a59', grassA: '#bc9f5f', grassB: '#e1cf9c',
    density: 0.05, fall: 0.2, trunk: '#ece5d2'
  }
};

const small = () => window.innerWidth < 900;

function random(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

// Rows of poplars running across the view, as they are planted: the nearest row 30m off,
// the furthest beyond 70m.
function plantTrees(rand) {
  const trees = [];
  for (let z = -30, row = 0; z > -78; z -= 4 + rand() * 2, row++) {
    const spacing = 2.1 + row * 0.15;
    for (let x = -60 + rand() * spacing; x < 60; x += spacing + rand() * 0.6) {
      trees.push({ x, z: z + (rand() - 0.5) * 1.2, h: 9 + rand() * 4.5, r: 0.5 + rand() * 0.22 });
    }
  }
  return trees;
}

// Every dab carries its own position, the foot of its tree (for the sway), a random number
// (colour, size, whether it is shown at the current density) and how high up its tree it sits.
function treeDabs(trees, rand, perTree) {
  const n = trees.length * perTree;
  const d = { center: new Float32Array(n * 3), base: new Float32Array(n * 3), rand: new Float32Array(n), lift: new Float32Array(n) };
  let i = 0;
  for (const t of trees) {
    for (let k = 0; k < perTree; k++, i++) {
      // The Lombardy-poplar spindle: bare trunk at the foot, widest a third of the way up, a point at the top.
      const u = 0.2 + rand() * 0.82;
      const shape = Math.pow(Math.sin(Math.PI * Math.pow((u - 0.2) / 0.82, 0.62)), 1.1);
      const radius = t.r * shape * Math.sqrt(rand());
      const a = rand() * Math.PI * 2;
      d.center.set([t.x + Math.cos(a) * radius, t.h * u, t.z + Math.sin(a) * radius], i * 3);
      d.base.set([t.x, 0, t.z], i * 3);
      d.rand[i] = rand();
      d.lift[i] = u;
    }
  }
  return d;
}

function meadowDabs(rand, count) {
  const d = { center: new Float32Array(count * 3), base: new Float32Array(count * 3), rand: new Float32Array(count), lift: new Float32Array(count) };
  for (let i = 0; i < count; i++) {
    // More tufts close to the camera, where they are big enough to read.
    const z = -3 - Math.pow(rand(), 1.6) * 60;
    const x = (rand() - 0.5) * (40 + (6 - z) * 1.4);
    d.center.set([x, 0.08 + rand() * 0.25, z], i * 3);
    d.base.set([x, 0, z], i * 3);
    d.rand[i] = rand();
    d.lift[i] = 0.25;
  }
  return d;
}

function fallingDabs(trees, rand, count) {
  const d = { center: new Float32Array(count * 3), base: new Float32Array(count * 3), rand: new Float32Array(count), lift: new Float32Array(count) };
  for (let i = 0; i < count; i++) {
    const t = trees[Math.floor(rand() * trees.length)];
    d.base.set([t.x + (rand() - 0.5) * 3, rand() * 12, t.z + 4 + rand() * 6], i * 3);
    d.rand[i] = rand();
  }
  return d;
}

function cloudDabs(rand) {
  const count = 700;
  const d = { center: new Float32Array(count * 3), base: new Float32Array(count * 3), rand: new Float32Array(count), lift: new Float32Array(count) };
  const clouds = Array.from({ length: 7 }, () => ({ x: (rand() - 0.5) * 280, y: 95 + rand() * 45, z: -170 - rand() * 30, w: 16 + rand() * 18 }));
  for (let i = 0; i < count; i++) {
    const c = clouds[i % clouds.length];
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    d.center.set([c.x + Math.cos(a) * r * c.w, c.y + Math.sin(a) * r * c.w * 0.28, c.z], i * 3);
    d.base.set([c.x, 0, c.z], i * 3);
    d.rand[i] = rand();
    d.lift[i] = 1;
  }
  return d;
}

const vertex = /* glsl */ `
  attribute vec3 aCenter;
  attribute vec3 aBase;
  attribute float aRand;
  attribute float aLift;
  uniform float uTime;
  uniform float uDensity;
  uniform float uMode;   // 0 leaves, 1 falling leaves, 2 meadow, 3 clouds
  uniform float uSize;
  varying float vRand;
  varying float vLift;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vRand = aRand;
    vLift = aLift;
    vec3 c = aCenter;
    float keep = step(aRand, uDensity);
    float spin = aRand * 6.2831;
    if (uMode == 1.0) {
      // Falling leaves drift down past the nearest row and start again at the top.
      float y = mod(aBase.y - uTime * (0.5 + aRand * 0.5), 12.0);
      c = vec3(aBase.x + sin(uTime * 0.7 + aRand * 30.0) * 0.9, y, aBase.z + cos(uTime * 0.4 + aRand * 9.0) * 0.6);
      spin += uTime * (1.0 + aRand);
    } else if (uMode == 3.0) {
      c.x += uTime * 0.6;
      c.x = mod(c.x + 160.0, 320.0) - 160.0;
      keep = 1.0;
    } else {
      float sway = aLift * aLift * (uMode == 2.0 ? 0.3 : 1.0);
      c.x += sin(uTime * 0.9 + aBase.z * 0.35 + aBase.x * 0.25) * 0.28 * sway;
      c.z += cos(uTime * 0.7 + aBase.x * 0.3) * 0.1 * sway;
    }
    vec4 mv = modelViewMatrix * vec4(c, 1.0);
    mat2 rot = mat2(cos(spin), -sin(spin), sin(spin), cos(spin));
    float s = keep * uSize * (0.7 + aRand * 0.6);
    vec2 stretch = uMode == 3.0 ? vec2(2.4, 1.0) : vec2(1.0, 1.7);
    mv.xy += rot * (position.xy * stretch * s);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uFog;
  uniform float uMode;
  varying float vRand;
  varying float vLift;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vec2 p = vUv - 0.5;
    if (dot(p, p) > 0.25) discard;
    vec3 col = mix(uColorA, uColorB, fract(vRand * 7.31));
    if (uMode == 0.0) col *= 0.8 + vLift * 0.35;
    float fog = uMode == 3.0 ? 0.0 : smoothstep(30.0, 120.0, vDepth) * 0.75;
    gl_FragColor = vec4(mix(col, uFog, fog), 1.0);
  }
`;

function Dabs({ data, mode, size, density, colorA, colorB, sky }) {
  // Made once; the frame loop below eases its uniforms toward whatever the props say now.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uDensity: { value: density },
          uMode: { value: mode },
          uSize: { value: size },
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
          uFog: { value: new THREE.Color(sky) }
        }
      }),
    []
  );

  const geometry = useMemo(() => {
    const quad = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = quad.index;
    geo.setAttribute('position', quad.attributes.position);
    geo.setAttribute('uv', quad.attributes.uv);
    geo.setAttribute('aCenter', new THREE.InstancedBufferAttribute(data.center, 3));
    geo.setAttribute('aBase', new THREE.InstancedBufferAttribute(data.base, 3));
    geo.setAttribute('aRand', new THREE.InstancedBufferAttribute(data.rand, 1));
    geo.setAttribute('aLift', new THREE.InstancedBufferAttribute(data.lift, 1));
    geo.instanceCount = data.rand.length;
    return geo;
  }, [data]);

  const goal = useMemo(() => ({ a: new THREE.Color(), b: new THREE.Color(), fog: new THREE.Color() }), []);

  // Colours and density ease toward the chosen season, so a new month paints itself in.
  useFrame((_, delta) => {
    const u = material.uniforms;
    if (!reduced()) u.uTime.value += delta;
    const k = Math.min(1, delta * 1.8);
    u.uColorA.value.lerp(goal.a.set(colorA), k);
    u.uColorB.value.lerp(goal.b.set(colorB), k);
    u.uFog.value.lerp(goal.fog.set(sky), k);
    u.uDensity.value += (density - u.uDensity.value) * k;
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

function Trunks({ trees, color }) {
  const ref = useRef(null);
  const goal = useMemo(() => new THREE.Color(), []);
  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    trees.forEach((t, i) => {
      m.compose(new THREE.Vector3(t.x, t.h * 0.47, t.z), q, new THREE.Vector3(1, t.h * 0.94, 1));
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [trees]);
  useFrame((_, delta) => ref.current.material.color.lerp(goal.set(color), Math.min(1, delta * 1.8)));
  return (
    <instancedMesh ref={ref} args={[null, null, trees.length]} frustumCulled={false}>
      <cylinderGeometry args={[0.04, 0.14, 1, 5]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

function World({ season, progress }) {
  const look = LOOKS[season];
  const { scene, camera } = useThree();

  const built = useMemo(() => {
    const rand = random(11);
    const trees = plantTrees(rand);
    const lite = small();
    return {
      trees,
      leaves: treeDabs(trees, rand, lite ? 120 : 200),
      meadow: meadowDabs(rand, lite ? 5000 : 9000),
      falling: fallingDabs(trees, rand, 500),
      clouds: cloudDabs(rand)
    };
  }, []);

  const sky = useRef(new THREE.Color(look.sky)).current;
  const goal = useMemo(() => ({ sky: new THREE.Color(), ground: new THREE.Color() }), []);
  const ground = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.background = sky;
    const move = (e) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [scene, sky]);

  useFrame((state, delta) => {
    const k = Math.min(1, delta * 1.8);
    sky.lerp(goal.sky.set(look.sky), k);
    ground.current.material.color.lerp(goal.ground.set(look.ground), k);
    // A slow walk along the meadow, so the rows slide past one another; scrolling the hero away
    // walks toward the trees and looks up into them.
    const t = reduced() ? 0 : state.clock.elapsedTime;
    const p = progress.current;
    const x = Math.sin(t * 0.045) * 9 + pointer.current.x * 1.5;
    camera.position.x += (x - camera.position.x) * 0.05;
    camera.position.y += (1.6 + p * 3 - pointer.current.y * 0.5 - camera.position.y) * 0.06;
    camera.position.z += (8 - p * 16 - camera.position.z) * 0.08;
    camera.lookAt(camera.position.x * 0.9, 13 + p * 6, -30);
  });

  return (
    <>
      <mesh ref={ground} rotation-x={-Math.PI / 2} position={[0, 0, -40]}>
        <planeGeometry args={[400, 200]} />
        <meshBasicMaterial color={look.ground} />
      </mesh>
      <Dabs data={built.clouds} mode={3} size={7} density={1} colorA={look.cloud} colorB="#fbfaf4" sky={look.sky} />
      <Dabs data={built.meadow} mode={2} size={0.15} density={1} colorA={look.grassA} colorB={look.grassB} sky={look.sky} />
      <Trunks trees={built.trees} color={look.trunk} />
      <Dabs data={built.leaves} mode={0} size={0.3} density={look.density} colorA={look.leafA} colorB={look.leafB} sky={look.sky} />
      <Dabs data={built.falling} mode={1} size={0.16} density={look.fall} colorA={look.leafA} colorB={look.leafB} sky={look.sky} />
    </>
  );
}

export default function GroveScene({ season, progress, active }) {
  return (
    <Canvas
      className="grove-canvas"
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 1.6, 8], fov: 48, near: 0.1, far: 400 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <World season={season} progress={progress} />
    </Canvas>
  );
}
