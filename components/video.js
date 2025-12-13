'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

export default function Video({
  videoUrl,
  autoPlay = true,
  controls = false,
  placeholderImage,
}) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setAllowVideo(true);
  }, []);

  const videoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="relative mx-2 lg:mx-0 aspect-video">
      {allowVideo && (
        <video
          autoPlay={autoPlay}
          controls={controls}
          muted
          loop
          playsInline
          disablePictureInPicture={!controls}
          onCanPlayThrough={videoLoaded}
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            isVideoLoaded ? 'z-30' : 'z-10'
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" />
        </video>
      )}
      {placeholderImage && (
        <Image
          src={placeholderImage.url}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover z-20"
          priority={false}
        />
      )}
    </div>
  );
}

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool,
  placeholderImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};
