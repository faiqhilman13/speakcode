import { useEffect, useState } from 'react'

export default function BrushCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isOverDark, setIsOverDark] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if cursor is over footer (dark section)
      const element = document.elementFromPoint(e.clientX, e.clientY)
      const isInFooter = element?.closest('footer') !== null
      setIsOverDark(isInFooter)
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

  const cursorColor = isOverDark ? '#fff' : '#000'

  return (
    <div
      className={`surgical-cursor ${isClicking ? 'clicking' : ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="reticle-core" style={{ background: isClicking ? '#ff0000' : cursorColor }} />
      <div className="reticle-bracket tl" style={{ borderColor: isClicking ? '#ff0000' : cursorColor }} />
      <div className="reticle-bracket tr" style={{ borderColor: isClicking ? '#ff0000' : cursorColor }} />
      <div className="reticle-bracket bl" style={{ borderColor: isClicking ? '#ff0000' : cursorColor }} />
      <div className="reticle-bracket br" style={{ borderColor: isClicking ? '#ff0000' : cursorColor }} />

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
          transform: translate(-50%, -50%);
          transition: all 0.2s ease;
        }
        .reticle-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border-width: 1.5px;
          border-style: solid;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .br { bottom: 0; right: 0; border-left: none; border-top: none; }

        .clicking .reticle-bracket {
          width: 12px;
          height: 12px;
          box-shadow: 0 0 10px rgba(255,0,0,0.5);
        }
        .clicking .reticle-core {
          transform: translate(-50%, -50%) scale(2);
        }
        * { cursor: none !important; }
      `}</style>
    </div>
  )
}
