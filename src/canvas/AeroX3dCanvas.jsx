import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function AeroX3dCanvas({ colorTheme = 'silver', explodedValue = 0 }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const partsRef = useRef({});
  const [activePreset, setActivePreset] = useState('default');

  // Apple Theme Hex Colors
  const themeHex = {
    silver: 0xE2E8F0,
    black: 0x1E293B,
    navy: 0x1E3A8A
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Scene, Perspective Camera, and WebGLRenderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(5.8, 2.5, 6.4);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. PMREMGenerator Studio Environment for Apple Commercial Specular Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileCubemapShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xffffff);

    const boxGeo = new THREE.PlaneGeometry(16, 16);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const topLight = new THREE.Mesh(boxGeo, boxMat);
    topLight.position.set(0, 10, 0);
    topLight.rotation.x = Math.PI / 2;
    envScene.add(topLight);

    const blueSoftMat = new THREE.MeshBasicMaterial({ color: 0x60A5FA });
    const sideLight1 = new THREE.Mesh(boxGeo, blueSoftMat);
    sideLight1.position.set(-10, 5, 0);
    sideLight1.rotation.y = Math.PI / 2;
    envScene.add(sideLight1);

    const warmSoftMat = new THREE.MeshBasicMaterial({ color: 0xFBA94C });
    const sideLight2 = new THREE.Mesh(boxGeo, warmSoftMat);
    sideLight2.position.set(10, 5, -5);
    sideLight2.rotation.y = -Math.PI / 2;
    envScene.add(sideLight2);

    const envMap = pmremGenerator.fromScene(envScene, 0.04);
    scene.environment = envMap.texture;
    pmremGenerator.dispose();

    // 3. OrbitControls (Smooth 360° rotation, damping, zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.045;
    controls.enableZoom = true;
    controls.minDistance = 2.4;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2 + 0.08;
    controls.target.set(0, 0.1, 0);
    controlsRef.current = controls;

    // 4. Studio Commercial Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(6, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0071E3, 1.8);
    fillLight.position.set(-8, 4, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xC25E00, 1.6);
    rimLight.position.set(2, -4, -10);
    scene.add(rimLight);

    // 5. Procedural Textures (SP-LX7 Registration Marking & Carbon Weave)
    const createRegistrationTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 256, 64);
      ctx.fillStyle = '#1D1D1F';
      ctx.font = 'bold 36px Inter, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SP-LX7', 128, 32);
      return new THREE.CanvasTexture(canvas);
    };
    const regTex = createRegistrationTexture();

    const createCarbonTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = '#2d2d2d';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillRect(32, 32, 32, 32);
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(16, 16);
      return tex;
    };
    const carbonTex = createCarbonTexture();

    // 6. Hyper-Realistic PBR Materials matching hero-evtol-sky.jpg
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: themeHex[colorTheme] || 0xE2E8F0,
      metalness: 0.94,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 2.8
    });
    partsRef.current.titaniumMat = titaniumMat;

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.6,
      roughness: 0.35,
      bumpMap: carbonTex,
      bumpScale: 0.015,
      clearcoat: 0.7
    });

    const polishedSteelMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 3.0
    });

    const qGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93C5FD,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      metalness: 0.05,
      ior: 1.52,
      thickness: 0.7,
      specularIntensity: 1.5,
      envMapIntensity: 2.8
    });

    const leatherSeatsMat = new THREE.MeshStandardMaterial({
      color: 0xD2B48C,
      roughness: 0.6,
      metalness: 0.05
    });

    const emissiveCyanMat = new THREE.MeshBasicMaterial({ color: 0x00E599 });
    const emissiveBlueMat = new THREE.MeshBasicMaterial({ color: 0x0071E3 });
    const emissiveRedMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });

    // 7. SCULPTING THE 1:1 eVTOL AIRCRAFT MATCHING hero-evtol-sky.jpg
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- A. AERODYNAMIC TEARDROP CABIN FUSELAGE ---
    const fuselageGroup = new THREE.Group();
    rootGroup.add(fuselageGroup);
    partsRef.current.fuselageGroup = fuselageGroup;

    // Egg/teardrop cabin shape
    const cabinGeo = new THREE.SphereGeometry(1, 32, 32);
    cabinGeo.scale(1.7, 0.78, 0.92);
    const cabinMesh = new THREE.Mesh(cabinGeo, titaniumMat);
    cabinMesh.castShadow = true;
    cabinMesh.receiveShadow = true;
    fuselageGroup.add(cabinMesh);

    // Front horizontal LED headlight slit on nose
    const headlightGeo = new THREE.BoxGeometry(0.75, 0.04, 0.08);
    const headlightMesh = new THREE.Mesh(headlightGeo, emissiveCyanMat);
    headlightMesh.position.set(1.5, -0.15, 0);
    fuselageGroup.add(headlightMesh);

    // SP-LX7 Registration Badge on Rear Side Fuselage
    const regMat = new THREE.MeshBasicMaterial({
      map: regTex,
      transparent: true,
      depthWrite: false
    });
    const regGeo = new THREE.PlaneGeometry(0.8, 0.2);
    const leftReg = new THREE.Mesh(regGeo, regMat);
    leftReg.position.set(-0.6, 0.12, 0.93);
    leftReg.rotation.y = 0.15;
    fuselageGroup.add(leftReg);

    const rightReg = new THREE.Mesh(regGeo, regMat);
    rightReg.position.set(-0.6, 0.12, -0.93);
    rightReg.rotation.y = Math.PI - 0.15;
    fuselageGroup.add(rightReg);

    // --- B. Q-GLASS CANOPY & LUXURY COCKPIT INTERIOR ---
    const canopyGroup = new THREE.Group();
    rootGroup.add(canopyGroup);
    partsRef.current.canopyGroup = canopyGroup;

    const canopyGeo = new THREE.SphereGeometry(0.82, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55);
    canopyGeo.scale(1.35, 0.78, 0.98);
    const canopyMesh = new THREE.Mesh(canopyGeo, qGlassMat);
    canopyMesh.position.set(0.48, 0.15, 0);
    canopyMesh.rotation.z = -0.25;
    canopyGroup.add(canopyMesh);

    // Internal tan/cream leather bucket seats
    const createSeat = (zOffset) => {
      const group = new THREE.Group();
      const cushionGeo = new THREE.BoxGeometry(0.5, 0.12, 0.44);
      const cushion = new THREE.Mesh(cushionGeo, leatherSeatsMat);
      group.add(cushion);
      const backGeo = new THREE.BoxGeometry(0.12, 0.65, 0.44);
      const back = new THREE.Mesh(backGeo, leatherSeatsMat);
      back.position.set(-0.24, 0.35, 0);
      back.rotation.z = 0.2;
      group.add(back);
      const shellGeo = new THREE.BoxGeometry(0.04, 0.65, 0.45);
      const shell = new THREE.Mesh(shellGeo, carbonMat);
      shell.position.set(-0.31, 0.35, 0);
      shell.rotation.z = 0.2;
      group.add(shell);
      group.position.set(0.3, -0.15, zOffset);
      return group;
    };
    canopyGroup.add(createSeat(0.3));
    canopyGroup.add(createSeat(-0.3));

    // Dual glowing dashboard LCD screens
    const screenGeo = new THREE.PlaneGeometry(0.36, 0.16);
    const screen1 = new THREE.Mesh(screenGeo, emissiveCyanMat);
    screen1.position.set(1.05, 0.08, 0.26);
    screen1.rotation.y = -Math.PI / 2 + 0.3;
    canopyGroup.add(screen1);

    const screen2 = new THREE.Mesh(screenGeo, emissiveBlueMat);
    screen2.position.set(1.05, 0.08, -0.26);
    screen2.rotation.y = -Math.PI / 2 - 0.3;
    canopyGroup.add(screen2);

    // --- C. Q9 AEROSPACE QUANTUM CORE ---
    const q9CoreGroup = new THREE.Group();
    rootGroup.add(q9CoreGroup);
    partsRef.current.q9CoreGroup = q9CoreGroup;

    const coreGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const coreMesh = new THREE.Mesh(coreGeo, carbonMat);
    coreMesh.position.set(0.2, -0.05, 0);
    q9CoreGroup.add(coreMesh);

    const coreRingGeo = new THREE.BoxGeometry(0.38, 0.06, 0.38);
    const coreRing = new THREE.Mesh(coreRingGeo, emissiveCyanMat);
    coreRing.position.set(0.2, -0.05, 0);
    q9CoreGroup.add(coreRing);

    // --- D. 6 OUTRIGGER ARM VTOL PROPELLER PODS (1:1 matching hero-evtol-sky.jpg) ---
    const outriggerGroup = new THREE.Group();
    rootGroup.add(outriggerGroup);
    partsRef.current.outriggerGroup = outriggerGroup;

    const rotorPods = [];
    partsRef.current.rotorPods = rotorPods;

    // 6 Arm coordinates matching photo: Front Port/Stbd, Mid Port/Stbd, Rear Port/Stbd
    const armPositions = [
      { x: 1.1, z: 2.1, ang: 0.35 },    // Front Left
      { x: 1.1, z: -2.1, ang: -0.35 },  // Front Right
      { x: 0.0, z: 2.6, ang: 0.0 },     // Mid Left
      { x: 0.0, z: -2.6, ang: 0.0 },    // Mid Right
      { x: -1.2, z: 2.1, ang: -0.35 },  // Rear Left
      { x: -1.2, z: -2.1, ang: 0.35 }   // Rear Right
    ];

    armPositions.forEach((arm, idx) => {
      // Streamlined titanium outrigger boom extending from cabin
      const boomLen = Math.abs(arm.z) - 0.7;
      const boomGeo = new THREE.CylinderGeometry(0.08, 0.12, boomLen, 16);
      boomGeo.rotateX(Math.PI / 2);
      const boom = new THREE.Mesh(boomGeo, titaniumMat);
      boom.position.set(arm.x, 0.25, arm.z / 2);
      outriggerGroup.add(boom);

      // VTOL Propeller Pod housing
      const podGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.25, 24);
      const podMesh = new THREE.Mesh(podGeo, titaniumMat);
      podMesh.position.set(arm.x, 0.35, arm.z);
      podMesh.castShadow = true;
      outriggerGroup.add(podMesh);

      // High-speed spinning 4-blade VTOL rotor
      const rotorGroup = new THREE.Group();
      rotorGroup.position.set(arm.x, 0.52, arm.z);
      outriggerGroup.add(rotorGroup);
      rotorPods.push(rotorGroup);

      const hubGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.08, 16);
      const hub = new THREE.Mesh(hubGeo, polishedSteelMat);
      rotorGroup.add(hub);

      const bladeGeo = new THREE.BoxGeometry(1.6, 0.025, 0.18);
      for (let b = 0; b < 4; b++) {
        const blade = new THREE.Mesh(bladeGeo, carbonMat);
        blade.rotation.y = (b * Math.PI) / 2;
        blade.castShadow = true;
        rotorGroup.add(blade);

        // Silver/Cyan aerodynamic safety tip
        const tipGeo = new THREE.BoxGeometry(0.2, 0.03, 0.19);
        const tip = new THREE.Mesh(tipGeo, idx % 2 === 0 ? emissiveCyanMat : emissiveBlueMat);
        tip.position.set(0.7, 0, 0);
        blade.add(tip);
      }
    });

    // --- E. TUBULAR TRAPEZOIDAL LANDING SKIDS (matching curved loop in photo) ---
    const landingSkidsGroup = new THREE.Group();
    rootGroup.add(landingSkidsGroup);
    partsRef.current.landingSkidsGroup = landingSkidsGroup;

    // Curved skid tubes
    const skidGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.6, 24);
    skidGeo.rotateZ(Math.PI / 2);
    const leftSkid = new THREE.Mesh(skidGeo, polishedSteelMat);
    leftSkid.position.set(0, -0.92, 0.82);
    leftSkid.castShadow = true;
    landingSkidsGroup.add(leftSkid);

    const rightSkid = new THREE.Mesh(skidGeo, polishedSteelMat);
    rightSkid.position.set(0, -0.92, -0.82);
    rightSkid.castShadow = true;
    landingSkidsGroup.add(rightSkid);

    // Skid Cross-loop connectors
    const crossGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.64, 24);
    crossGeo.rotateX(Math.PI / 2);
    const frontCross = new THREE.Mesh(crossGeo, polishedSteelMat);
    frontCross.position.set(1.1, -0.92, 0);
    landingSkidsGroup.add(frontCross);

    const rearCross = new THREE.Mesh(crossGeo, polishedSteelMat);
    rearCross.position.set(-1.1, -0.92, 0);
    landingSkidsGroup.add(rearCross);

    // Struts attaching skids to cabin
    const strutGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 16);
    const strutCoords = [
      { x: 0.8, z: 0.75 }, { x: -0.8, z: 0.75 },
      { x: 0.8, z: -0.75 }, { x: -0.8, z: -0.75 }
    ];
    strutCoords.forEach((sc) => {
      const strut = new THREE.Mesh(strutGeo, titaniumMat);
      strut.position.set(sc.x, -0.62, sc.z);
      strut.rotation.z = sc.x > 0 ? -0.22 : 0.22;
      landingSkidsGroup.add(strut);
    });

    // --- F. TAIL BOOM & V-TAIL STABILIZER FINS ---
    const tailGroup = new THREE.Group();
    rootGroup.add(tailGroup);
    partsRef.current.tailGroup = tailGroup;

    const boomGeo = new THREE.CylinderGeometry(0.12, 0.38, 2.8, 24);
    boomGeo.rotateZ(Math.PI / 2);
    const boomMesh = new THREE.Mesh(boomGeo, titaniumMat);
    boomMesh.position.set(-2.2, 0.25, 0);
    boomMesh.castShadow = true;
    tailGroup.add(boomMesh);

    // V-Tail stabilizer fins
    const finGeo = new THREE.BoxGeometry(0.6, 1.1, 0.06);
    const leftFin = new THREE.Mesh(finGeo, titaniumMat);
    leftFin.position.set(-3.3, 0.65, 0.45);
    leftFin.rotation.x = -0.4;
    leftFin.rotation.z = 0.3;
    tailGroup.add(leftFin);

    const rightFin = new THREE.Mesh(finGeo, titaniumMat);
    rightFin.position.set(-3.3, 0.65, -0.45);
    rightFin.rotation.x = 0.4;
    rightFin.rotation.z = 0.3;
    tailGroup.add(rightFin);

    // Blinking Anti-Collision Beacon LED on tail
    const beaconGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const beaconMesh = new THREE.Mesh(beaconGeo, emissiveRedMat);
    beaconMesh.position.set(-3.5, 0.95, 0);
    tailGroup.add(beaconMesh);
    partsRef.current.beaconMesh = beaconMesh;

    // --- G. CONTACT SHADOW GROUND PLANE ---
    const shadowGeo = new THREE.PlaneGeometry(14, 14);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const groundMesh = new THREE.Mesh(shadowGeo, shadowMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.98;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 8. 60 FPS ANIMATION LOOP (Spinning 6 Outrigger Propellers & Strobe)
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate all 6 outrigger VTOL propellers (counter-rotating pairs for aerodynamic realism!)
      partsRef.current.rotorPods.forEach((pod, index) => {
        const dir = index % 2 === 0 ? 1 : -1;
        pod.rotation.y += 0.48 * dir;
      });

      // Pulsate tail anti-collision beacon LED
      if (partsRef.current.beaconMesh) {
        const pulse = (Math.sin(elapsed * 12) + 1) * 0.5;
        partsRef.current.beaconMesh.scale.setScalar(0.7 + pulse * 0.6);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Titanium Finish when colorTheme changes
  useEffect(() => {
    if (partsRef.current.titaniumMat) {
      partsRef.current.titaniumMat.color.setHex(
        colorTheme === 'silver' ? 0xE2E8F0 : colorTheme === 'black' ? 0x1E293B : 0x1E3A8A
      );
    }
  }, [colorTheme]);

  // Apple Keynote Exploded View Separation in 3D when explodedValue changes
  useEffect(() => {
    const factor = (explodedValue / 100);

    if (partsRef.current.canopyGroup) {
      partsRef.current.canopyGroup.position.set(factor * 1.3, factor * 0.5, 0);
    }
    if (partsRef.current.outriggerGroup) {
      // Extend all 6 outriggers outward along Z and Y
      partsRef.current.outriggerGroup.position.set(0, factor * 0.4, 0);
      const scaleFactor = 1 + factor * 0.35;
      partsRef.current.outriggerGroup.scale.set(1, 1, scaleFactor);
    }
    if (partsRef.current.landingSkidsGroup) {
      partsRef.current.landingSkidsGroup.position.set(0, -factor * 1.1, 0);
    }
    if (partsRef.current.tailGroup) {
      partsRef.current.tailGroup.position.set(-factor * 1.5, 0, 0);
    }
    if (partsRef.current.q9CoreGroup) {
      partsRef.current.q9CoreGroup.position.set(0, factor * 0.65, 0);
      const s = 1 + factor * 0.8;
      partsRef.current.q9CoreGroup.scale.set(s, s, s);
    }
  }, [explodedValue]);

  // Cinematic Camera Inspection Presets
  const handlePreset = (presetName) => {
    setActivePreset(presetName);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (presetName === 'default') {
      camera.position.set(5.8, 2.5, 6.4);
      controls.target.set(0, 0.1, 0);
    } else if (presetName === 'top') {
      camera.position.set(0.1, 9.5, 0.1);
      controls.target.set(0, 0, 0);
    } else if (presetName === 'cockpit') {
      camera.position.set(2.4, 0.4, 1.9);
      controls.target.set(0.4, 0.15, 0);
    } else if (presetName === 'side') {
      camera.position.set(0, 0.6, 7.8);
      controls.target.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* Three.js WebGL Interactive Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        aria-label="Hiper-realistyczny interaktywny model 3D 6-wirnikowego statku Aero-X Horizon eVTOL (SP-LX7) w Three.js"
      />

      {/* Top Left Status Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 text-[11px] font-mono text-[#1D1D1F] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
        <span>1:1 WZORZEC HERO-EVTOL-SKY.JPG (SP-LX7) • 6 WIRNIKÓW VTOL • OBRACAJ MYSZĄ / DOTYKIEM</span>
      </div>

      {/* Bottom Camera Angle Presets */}
      <div className="absolute bottom-4 z-20 flex flex-wrap items-center justify-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-200 shadow-md">
        <span className="text-[11px] font-semibold text-apple-sub mr-1 hidden sm:inline">
          Kamera 3D:
        </span>
        {[
          { id: 'default', label: '360° Start' },
          { id: 'top', label: '6 Wirników VTOL (Top)' },
          { id: 'cockpit', label: 'Kokpit Q9 & SP-LX7' },
          { id: 'side', label: 'Profil Alpejski (Side)' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => handlePreset(btn.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activePreset === btn.id
                ? 'bg-[#0071E3] text-white shadow-sm'
                : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-gray-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
