import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Mangment System",
    url: "https://github.com/xnigthmarex/Train-Reservation-System--Python-",
    image: "projects/train.png",
    description: "This Python script is a console-based railway management system. ",
  },
  {
    title: "Inventory System",
    url: "https://github.com/xnigthmarex/JS-Costumes-",
    image: "projects/inventory.png",
    description: "A Python-Based Register Application for Inventor Managament(For a Company)",
  },
  {
    title: "Messenger",
    url: "https://github.com/xnigthmarex/MessengerClone",
    image: "projects/messenger.png",
    description: "Chatting Site",
  },
  {
    title: "Next.js Starter",
    url: "https://github.com/xnigthmarex/Next.js-Perfect-starter",
    image: "projects/messenger.png",
    description: "Starter Template",
  },
  {
    title: "Fun Small Projects",
    url: "https://github.com/xnigthmarex/Fun-BashScripts",
    image: "projects/messenger.png",
    description: "The name is Self explanatory",
  },
  {
    title: "Kjaas",
    url: "https://github.com/xnigthmarex/kjaas",
    image: "projects/messenger.png",
    description: "E-commerce site",
  },
  {
    title: "AutomationScripts",
    url: "https://github.com/xnigthmarex/BashAutomationScripts",
    image: "projects/messenger.png",
    description: "These Scripts make it easy to download docker and deploying containers",
  },
  {
    title: "Coding p/s",
    url: "https://github.com/xnigthmarex/CodingBats-Answers",
    image: "projects/messenger.png",
    description: "This repo contains almost all of the solutions to questions on the codingbat.com website.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.3, 2.1]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2.6}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.13}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 3));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
