'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageZoomProps {
  imageUrl: string | null;
  altText: string;
  zoomLevel?: number;
  magnifierSize?: number;
}

export function ImageZoom({
  imageUrl,
  altText,
  zoomLevel = 2,
  magnifierSize = 200,
}: ImageZoomProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (imageContainerRef.current) {
        setImgSize([imageContainerRef.current.offsetWidth, imageContainerRef.current.offsetHeight]);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [imageUrl]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    
    const x = Math.min(Math.max(e.clientX - left, 0), imgWidth);
    const y = Math.min(Math.max(e.clientY - top, 0), imgHeight);
    setXY([x, y]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const magnifierHalf = magnifierSize / 2;

  const magnifierX = Math.min(Math.max(x - magnifierHalf, 0), imgWidth - magnifierSize);
  const magnifierY = Math.min(Math.max(y - magnifierHalf, 0), imgHeight - magnifierSize);

  const bgX = -x * zoomLevel + magnifierHalf;
  const bgY = -y * zoomLevel + magnifierHalf;

  const minBgX = -(imgWidth * zoomLevel - magnifierSize);
  const minBgY = -(imgHeight * zoomLevel - magnifierSize);
  const maxBgX = 0;
  const maxBgY = 0;

  const finalBgX = Math.max(minBgX, Math.min(bgX, maxBgX));
  const finalBgY = Math.max(minBgY, Math.min(bgY, maxBgY));

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full h-full cursor-crosshair"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover rounded-lg shadow-xl"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          top: `${magnifierY}px`,
          left: `${magnifierX}px`,
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
          border: '2px solid #bebebeff',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPosition: `${finalBgX}px ${finalBgY}px`,
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
}