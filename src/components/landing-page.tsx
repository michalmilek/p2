"use client";

import { GithubRepoCard } from "@/components/github-repo-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetRepoList } from "@/services";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false); 
  const { data: repos } = useGetRepoList();
  const router = useRouter();

  useEffect(() => {
    if (canvasRef.current) {
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      renderer.setSize(window.innerWidth, window.innerHeight);

      
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 2);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      let medallion: THREE.Object3D | null = null;

      
      const loader = new GLTFLoader();
      loader.load(
        "/witcher_3_type_sword.glb",
        (gltf) => {
          medallion = gltf.scene;

          
          medallion.traverse((node) => {
            if (node instanceof THREE.Mesh) {
              node.material = new THREE.MeshStandardMaterial({
                color: 0xcccccc, 
                metalness: 0.8,  
                roughness: 0.2,  
              });
            }
          });

          
          medallion.scale.set(0.15, 0.15, 0.15);

          scene.add(medallion);
        },
        undefined,
        (error) => {
          console.error("An error occurred while loading the model:", error);
        }
      );

      camera.position.z = 5;

      
      let rotating = true;
      let rotationAmount = 0;
      const rotationSpeed = 0.005; 

      const animate = () => {
        requestAnimationFrame(animate);

        if (medallion) {
          if (rotating) {
            medallion.rotation.y += rotationSpeed;
            rotationAmount += rotationSpeed;

            
            if (Math.abs(medallion.rotation.y % (2 * Math.PI) - Math.PI) < 0.1) {
              setShowText(true); 
            } else {
              setShowText(false); 
            }
            
            if (rotationAmount >= Math.PI) {
              rotating = false;
              setTimeout(() => {
                rotationAmount = 0;
                rotating = true; 
              }, 2000); 
            }
          }
        }

        renderer.render(scene, camera);
      };
      animate();

      
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      
      return () => {
        window.removeEventListener("resize", handleResize);
        if (medallion) {
          scene.remove(medallion);
        }
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="relative z-10 flex w-full flex-col justify-start items-center flex-grow h-[125vh]">
      <canvas
        ref={canvasRef}
        className="absolute top-[350px] left-1/2 -translate-x-1/2 w-full h-full"
      />
      {/* Popping Text */}
      {showText && (
        <motion.div
          className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#d4af37] z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          In the name of king I sentence you to...
        </motion.div>
      )}
      
      <section className="text-center relative z-10">
        <motion.h1
          className="text-6xl font-bold mb-4 font-cinzel"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Michał Miłek
        </motion.h1>
        <motion.p
          className="text-xl text-[#f0e68c] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Crafting digital experiences with the precision of a monster hunter
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button
            asChild
            className="bg-[#d4af37] text-[#1a1a1a] hover:bg-[#f0e68c]"
          >
            <a href="#projects">View My Quests</a>
          </Button>
        </motion.div>
      </section>

      <motion.section
        id="projects"
        className="mt-16 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-4 font-cinzel text-center">
          Completed Contracts (github repos)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos?.slice(0, 6).map((repo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
            >
              <GithubRepoCard repo={repo} />
            </motion.div>
          ))}
           <motion.button
              onClick={() => router.push("/repositories")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + ((repos && repos?.length > 6) ? 6 : (repos?.length ?? 1)) * 0.2, duration: 0.5 }}
            >
              <Card className="bg-[#2a2a2a] border-[#d4af37]/20 overflow-hidden group">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 font-cinzel text-white">
                    And {(repos?.length ?? 0) - 6} more...
                  </h3>
                  <p className="text-[#f0e68c]">Click here to see all my repos</p>
                  <div className="mt-4 h-1 w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></div>
                </CardContent>
              </Card>
            </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
