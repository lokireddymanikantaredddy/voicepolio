"use client"
import React from "react";

const BackgroundVideo = ({ className = "" }: { className?: string }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    className={`absolute inset-0 w-full h-full object-cover -z-10 ${className}`}
    style={{ pointerEvents: 'none' }}
  >
    <source src="https://hellorobosite.s3.us-east-2.amazonaws.com/Hello+Robo+Reel+2.webm" className="blur" type="video/mp4" />
    {/* Optionally add a .webm source for better performance */}
    Your browser does not support the video tag.
  </video>
);

export default BackgroundVideo; 