import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HorizonScene() {
    const containerRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })
    const lastScrollRef = useRef(0)

    useEffect(() => {
        if (!containerRef.current) return

        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xfdfcf8)

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000)
        camera.position.set(0, 20, 150)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)

        // Dojo Floor
        const grid = new THREE.GridHelper(3000, 120, 0xcc0000, 0xd1d5db)
        grid.position.y = -20
        scene.add(grid)

        // Torii Gates
        const createTorii = (zPos) => {
            const group = new THREE.Group()
            const material = new THREE.MeshBasicMaterial({ color: 0xcc0000 })
            const pillarGeo = new THREE.BoxGeometry(4, 100, 4)
            const leftPillar = new THREE.Mesh(pillarGeo, material); leftPillar.position.set(-60, 30, 0); group.add(leftPillar)
            const rightPillar = new THREE.Mesh(pillarGeo, material); rightPillar.position.set(60, 30, 0); group.add(rightPillar)
            const barGeo = new THREE.BoxGeometry(140, 8, 6); const bar = new THREE.Mesh(barGeo, material); bar.position.set(0, 80, 0); group.add(bar)
            const bar2Geo = new THREE.BoxGeometry(110, 4, 4); const bar2 = new THREE.Mesh(bar2Geo, material); bar2.position.set(0, 65, 0); group.add(bar2)
            group.position.z = zPos
            return group
        }
        for (let i = 0; i < 12; i++) {
            scene.add(createTorii(-i * 300))
        }

        // --- THE SHRINE CORE (Replaced the red ball) ---
        const shrineGroup = new THREE.Group()
        shrineGroup.position.set(0, 60, -3200)
        scene.add(shrineGroup)

        const coreMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        const mainCore = new THREE.Mesh(new THREE.IcosahedronGeometry(120, 1), coreMat)
        shrineGroup.add(mainCore)

        // Orbiting Rings
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xcc0000, side: THREE.DoubleSide, wireframe: true })
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(180, 2, 16, 100), ringMat)
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(220, 2, 16, 100), ringMat)
        ring1.rotation.x = Math.PI / 4
        ring2.rotation.y = Math.PI / 4
        shrineGroup.add(ring1)
        shrineGroup.add(ring2)

        // Massive Point Light for Blinding Effect
        const blindingLight = new THREE.PointLight(0xff0000, 0, 3000)
        shrineGroup.add(blindingLight)

        // Blinding Flare Plane
        const flareGeo = new THREE.PlaneGeometry(1000, 1000)
        const flareMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        })
        const flare = new THREE.Mesh(flareGeo, flareMat)
        flare.position.z = 100 // Slightly in front of core
        shrineGroup.add(flare)

        // Sakura Data
        const petals = []
        const petalGeo = new THREE.PlaneGeometry(0.8, 0.8)
        const petalMat = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        for (let i = 0; i < 300; i++) {
            const petal = new THREE.Mesh(petalGeo, petalMat)
            petal.position.set((Math.random() - 0.5) * 500, Math.random() * 300, (Math.random() - 0.5) * 3000)
            scene.add(petal)
            petals.push({ mesh: petal, rotX: Math.random() * 0.1, rotZ: Math.random() * 0.1, fall: 0.2 + Math.random() * 0.4 })
        }

        scene.fog = new THREE.Fog(0xfdfcf8, 200, 3500)

        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5
            mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5
        }

        const handleScroll = () => {
            lastScrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)

        const animate = () => {
            requestAnimationFrame(animate)
            const scroll = lastScrollRef.current

            // Fast travel through dimensions
            const targetZ = 150 - (scroll * 3500)
            camera.position.z += (targetZ - camera.position.z) * 0.05
            camera.position.x += (mouseRef.current.x * 40 - camera.position.x) * 0.02
            camera.position.y += (30 - mouseRef.current.y * 20 - camera.position.y) * 0.02
            camera.lookAt(0, 30, camera.position.z - 150)

            // Shrine Animation
            mainCore.rotation.y += 0.01
            mainCore.rotation.x += 0.005
            ring1.rotation.z += 0.02
            ring2.rotation.z -= 0.015

            // Blinding Logic
            const intensity = Math.pow(scroll, 6) * 1000
            blindingLight.intensity = intensity
            flareMat.opacity = Math.pow(scroll, 8) // Sharp increase towards the very end

            petals.forEach(p => {
                p.mesh.position.y -= p.fall
                p.mesh.rotation.x += p.rotX
                p.mesh.rotation.z += p.rotZ
                if (p.mesh.position.y < -50) p.mesh.position.y = 200
            })

            renderer.render(scene, camera)
        }
        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
            containerRef.current?.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', backgroundColor: '#fdfcf8' }} />
    )
}
