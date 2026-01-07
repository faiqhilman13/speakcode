import { useEffect, useState } from 'react'

export default function BrushCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      className={`surgical-cursor ${isClicking ? 'clicking' : ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="reticle-core" />
      <div className="reticle-bracket tl" />
      <div className="reticle-bracket tr" />
      <div className="reticle-bracket bl" />
      <div className="reticle-bracket br" />

      <style>{`
        .surgical-cursor {
          position: fixed;
          width: 32px;
          height: 32px;
          pointer-events: none;
          z-index: 100000;
          transform: translate(-50%, -50%);
        }
        .reticle-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 3px;
          background: #000;
          transform: translate(-50%, -50%);
        }
        .reticle-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1.5px solid #000;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .br { bottom: 0; right: 0; border-left: none; border-top: none; }
        
        .clicking .reticle-bracket {
          width: 12px;
          height: 12px;
          border-color: #ff0000;
          box-shadow: 0 0 10px rgba(255,0,0,0.5);
        }
        .clicking .reticle-core {
          background: #ff0000;
          transform: translate(-50%, -50%) scale(2);
        }
        * { cursor: none !important; }
      `}</style>
    </div>
  )
}
