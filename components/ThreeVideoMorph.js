"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeVideoMorph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const targetEl = document.querySelector(".fp-rotating-text-block");
    if (!targetEl) return;

    // GET TARGET POSITION
    const rect = targetEl.getBoundingClientRect();

    // THREE.JS SETUP
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    // LIGHT
    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(2, 3, 4);
    scene.add(light);

    // GEOMETRIES: sphere → plane
    const sphereGeo = new THREE.SphereGeometry(1, 128, 128);
    const planeGeo = new THREE.PlaneGeometry(3.5, 2, 128, 128);

    // VIDEO TEXTURE
    const video = document.createElement("video");
    video.src = "/videos/3571264-hd_1920_1080_30fps.mp4"; // ← pakeisk savo keliu
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.play();

    const texture = new THREE.VideoTexture(video);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.2,
    });

    const mesh = new THREE.Mesh(sphereGeo, material);
    scene.add(mesh);

    // Position mesh over rotating circle
    const setInitialPosition = () => {
      const pos = targetEl.getBoundingClientRect();
      mesh.position.x = (pos.left + pos.width / 2 - window.innerWidth / 2) / 100;
      mesh.position.y =
        -(pos.top + pos.height / 2 - window.innerHeight / 2) / 100;
    };

    setInitialPosition();
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      setInitialPosition();
    });

    // MORPH ANIMATION
    gsap.to(mesh.geometry.attributes.position.array, {
      endArray: planeGeo.attributes.position.array,
      scrollTrigger: {
        trigger: ".fp-sec-hero-services",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(mesh.scale, {
      x: 3,
      y: 2,
      z: 1,
      scrollTrigger: {
        trigger: ".fp-sec-hero-services",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(camera.position, {
      z: 2.3,
      scrollTrigger: {
        trigger: ".fp-sec-hero-services",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // RENDER LOOP
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      video.pause();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}
