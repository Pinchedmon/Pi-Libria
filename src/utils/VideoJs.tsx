import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const Video = (props: any) => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, props);
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player!.dispose();
        }
      };
    }
  }, []);
  useEffect(() => {
    console.log(videoNode);
    // const _player = videojs(videoNode.current, props);
    // setPlayer(_player);
  }, [props]);
  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
    </div>
  );
};
