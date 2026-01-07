export default function KatanaSlash() {
  return (
    <div className="katana-slash-container">
      <div className="slash-line"></div>
      <style>{`
        .katana-slash-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .slash-line {
          position: absolute;
          top: 50%;
          left: -10%;
          width: 120%;
          height: 1px;
          background: #fff;
          transform: translateY(-50%) rotate(-15deg);
          box-shadow: 0 0 20px #fff, 0 0 40px #ff0000;
          opacity: 0.1;
          animation: slash-pulse 8s infinite;
        }
        @keyframes slash-pulse {
          0%, 100% { opacity: 0.05; transform: translateY(-50%) rotate(-15deg) scaleX(1); }
          50% { opacity: 0.15; transform: translateY(-50%) rotate(-15deg) scaleX(1.05); }
          55% { opacity: 0.4; }
          56% { opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}
