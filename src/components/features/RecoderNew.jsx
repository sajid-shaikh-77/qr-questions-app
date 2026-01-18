import { useRef, useState } from "react";
import PermissionHelpModal from "../dialog/PermissionHelpModal";

const MAX_DURATION = 30;

export default function RecorderNew({ onSave }) {
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAX_DURATION);
  const [showHelp, setShowHelp] = useState(false);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  async function start() {
    try {
      // 🔥 DO NOT pre-check permission
      // Let the browser handle permission popup
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = e => {
        if (e.data.size) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType
        });

        const dataUrl = URL.createObjectURL(blob);
        onSave?.({ blob, dataUrl });

        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setRecording(true);
      setTimeLeft(MAX_DURATION);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      // 🔥 ONLY here show help modal
      console.error("Mic permission error:", err);
      setShowHelp(true);
    }
  }

  function stop() {
    clearInterval(timerRef.current);
    setRecording(false);
    mediaRecorderRef.current?.stop();
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => (recording ? stop() : start())}
        className={`w-full py-3 rounded-xl text-white text-lg transition ${
          recording ? "bg-red-600" : "bg-[#064e47]"
        }`}
      >
        {recording ? `Stop (${timeLeft}s)` : "Record Audio"}
      </button>

      <PermissionHelpModal
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
