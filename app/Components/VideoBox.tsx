import { useEffect, useRef, useState } from 'react';
import { useMediaTrack } from '@daily-co/daily-react';

export default function VideoBox({ id }: any) {
  const videoTrack = useMediaTrack(id, 'video');
  const audioTrack = useMediaTrack(id, 'audio');

  const [videoSrcObjectSet, setVideoSrcObjectSet] = useState(false);
  const [audioSrcObjectSet, setAudioSrcObjectSet] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const videoElement = useRef<any>(null);
  const audioElement = useRef<any>(null);

  // Debug logging
  useEffect(() => {
    const info = `VideoBox Debug - ID: ${id}, VideoTrack: ${!!videoTrack?.track}, AudioTrack: ${!!audioTrack?.persistentTrack}`;
    setDebugInfo(info);
    console.log(info);
  }, [id, videoTrack, audioTrack]);

  useEffect(() => {
    const videoRef = videoElement.current;

    if (videoRef && videoTrack?.track && !videoSrcObjectSet) {
      try {
        videoRef.srcObject = new MediaStream([videoTrack.track]);
        setVideoSrcObjectSet(true);
        console.log('Video track set successfully');
      } catch (error) {
        console.error('Error setting video track:', error);
      }
    }
  }, [videoTrack, videoSrcObjectSet]);

  useEffect(() => {
    const audioRef = audioElement.current;

    if (audioRef && audioTrack?.persistentTrack && !audioSrcObjectSet) {
      try {
        audioRef.srcObject = new MediaStream([audioTrack.persistentTrack]);
        setAudioSrcObjectSet(true);
        console.log('Audio track set successfully');
      } catch (error) {
        console.error('Error setting audio track:', error);
      }
    }
  }, [audioTrack, audioSrcObjectSet]);

  return (
    <div className='h-full w-full relative'>
      {videoTrack ? (
        <video
          autoPlay
          muted
          playsInline
          ref={videoElement}
          className="w-full h-full object-cover rounded-lg"
          onLoadedData={() => console.log('Video loaded')}
          onError={(e) => console.error('Video error:', e)}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-white text-sm">Loading video...</p>
        </div>
      )}
      {audioTrack && (
        <audio
          autoPlay
          playsInline
          ref={audioElement}
          onLoadedData={() => console.log('Audio loaded')}
          onError={(e) => console.error('Audio error:', e)}
        />
      )}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
          {debugInfo}
        </div>
      )}
    </div>
  );
}
