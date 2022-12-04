import React, { useEffect, useState } from "react";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";

export default function Video({
  videoUrl,
  autoPlay = true,
  controls = false,
  placeholderImage,
  ...props
}) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setAllowVideo(true);
  }, []);

  const videoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const image = getImage(placeholderImage);
  const bgImage = convertToBgImage(image);

  return (
    <div className="relative mx-2 lg:mx-0">
      {allowVideo && (
        <video
          autoPlay={autoPlay}
          controls={controls}
          muted
          loop
          disablePictureInPicture={!controls}
          onCanPlayThrough={videoLoaded}
          className={`hidden md:block absolute top-0 left-0 w-full max-w-full ${
            isVideoLoaded ? "z-30" : "z-10"
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" />
        </video>
      )}
      <BackgroundImage
        {...bgImage}
        preserveStackingContext
        className="absolute top-0 left-0 aspect-video z30"
      ></BackgroundImage>
    </div>
  );
}
