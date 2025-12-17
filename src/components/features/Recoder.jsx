import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui';
import { Mic, Pause } from 'lucide-react';

export default function Recorder({ onSave }) {
  const [recording, setRecording] = useState(false);
  const [available, setAvailable] = useState(false);
  const [permissionError, setPermissionError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ? setAvailable(true)
      : setAvailable(false);
  }, []);

  async function start() {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const base64 = await blobToDataURL(blob);
        onSave({ blob, dataUrl: base64 });
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
    } catch (err) {
      console.error(err);
      setPermissionError('Microphone permission denied or not available');
    }
  }

  function stop() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }

  return (
    <div className="mt-3">
      {available ? (
        <div className="flex gap-3 items-center">
          <Button type='button' onClick={() => (recording ? stop() : start())} className={`px-4 py-2  cursor-pointer  font-medium ${recording ? 'bg-red-500 text-white' : 'bg-[#064e47] text-white'}`}>
            {recording ? <Pause /> : <Mic />}
          </Button>
          {permissionError && <div className="text-red-600">{permissionError}</div>}
        </div>
      ) : (
        <div className="text-sm text-gray-500">Recording not supported in this browser.</div>
      )}
    </div>
  );
}

function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(blob);
  });
}
