import React, { useState } from 'react';

const ZoomImage = ({ src, alt, zoom = 2.2, className = '' }) => {
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  // Mouse ki jagah ke hisab se zoom ka markaz badalta hai
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setOrigin('50% 50%');
      }}
      onMouseMove={handleMove}
      className={`relative cursor-zoom-in overflow-hidden bg-gray-50 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          transformOrigin: origin,
          transform: hovering ? `scale(${zoom})` : 'scale(1)',
        }}
        className="h-full w-full select-none object-contain transition-transform duration-200 ease-out"
      />
    </div>
  );
};

export default ZoomImage;