import React, { useEffect, useState} from "react";

export default function Video({ videoUrl, autoPlay=true, controls=false, ...props }) {

  const [allowVideo, setAllowVideo] = useState(false);
  
  useEffect(() => {
    setAllowVideo(true);
  }, []);
  
  return (allowVideo &&
    <video autoPlay={autoPlay} controls={controls} muted loop disablePictureInPicture={controls} className="w-full max-w-full">
      <source src={videoUrl} type="video/mp4" />
      <track kind="captions" />
    </video>
  );
}
