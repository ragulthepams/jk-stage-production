import { Canvas, useFrame } from '@react-three/fiber'
import { SpotLight, Environment, PerspectiveCamera, Stars } from '@react-three/drei'
import { useRef } from 'react'

// A sweeping cinematic event spotlight
function SweepingLight({ position, color, initialDelay, speed }) {
  const lightRef = useRef()
  const targetRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + initialDelay
    if (targetRef.current && lightRef.current) {
      // Sweep back and forth horizontally and subtly up/down
      targetRef.current.position.set(
        Math.sin(t * speed) * 8, 
        -5, 
        Math.cos(t * speed * 0.5) * 3
      )
      lightRef.current.target = targetRef.current
    }
  })

  return (
    <>
      <SpotLight
        ref={lightRef}
        position={position}
        color={color}
        distance={35}
        angle={0.3}
        attenuation={10}
        anglePower={6}
        intensity={6}
        penumbra={0.9}
        volumetric
        castShadow={false}
      />
      <object3D ref={targetRef} position={[0, -5, 0]} />
    </>
  )
}

export default function Hero3DScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.95 }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        
        {/* Soft base lighting to keep the background from being pitch black */}
        <ambientLight intensity={0.3} color="#2b2bb5" />
        
        {/* Sweeping Concert Lights */}
        <SweepingLight position={[-8, 8, 2]} color="#ffffff" initialDelay={0} speed={0.4} />
        <SweepingLight position={[-3, 8, 0]} color="#e8650a" initialDelay={Math.PI / 2} speed={0.5} />
        <SweepingLight position={[3, 8, 0]} color="#ffffff" initialDelay={Math.PI} speed={0.45} />
        <SweepingLight position={[8, 8, 2]} color="#e8650a" initialDelay={Math.PI * 1.5} speed={0.35} />
        
        {/* Very subtle atmospheric particles imitating concert fog/dust */}
        <Stars radius={40} depth={20} count={1500} factor={4} saturation={1} fade speed={0.5} />
        
        {/* Adds realistic depth to the fog */}
        <fog attach="fog" args={['#060612', 10, 30]} />
      </Canvas>
    </div>
  )
}
