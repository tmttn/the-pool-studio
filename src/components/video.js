import React from "react";

export default function Video({ videoUrl, ...props }) {
  return (
    <video autoPlay muted loop className="max-w-full">
      <source src={videoUrl} type="video/mp4" />
      <track kind="captions" />
    </video>
  );
}
