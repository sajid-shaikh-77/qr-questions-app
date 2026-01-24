import { useRef, useState } from "react";
import PermissionHelpModal from "../dialog/PermissionHelpModal";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../ui";
import { Mic, Pause, X } from "lucide-react";
import { Player } from '@lottiefiles/react-lottie-player';
import recordingAnimation from '../../assets/recording.json'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const MAX_DURATION = 60;

export default function RecorderNew({ onSave }) {
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAX_DURATION);
  const [showHelp, setShowHelp] = useState(false);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const isCanceledRef = useRef(false);

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
        if (isCanceledRef.current) {
          chunksRef.current = [];
          return;
        }
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType
        });

        const dataUrl = URL.createObjectURL(blob);
        onSave?.({ blob, dataUrl });

        stream.getTracks().forEach(track => track.stop());
      };
      isCanceledRef.current = false;
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
  function cencel() {
    // Mark this stop as cancel
    isCanceledRef.current = true;

    // Stop timer
    clearInterval(timerRef.current);

    // Stop recorder safely
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    // Stop mic stream
    streamRef.current?.getTracks().forEach(track => track.stop());

    // Clear audio data
    chunksRef.current = [];

    // Reset UI
    setRecording(false);
    setTimeLeft(MAX_DURATION);
  }
  return (
    <>
      {
        recording && <div className="flex items-center justify-center mx-auto mt-3">
          <h1 className="font-bold">{`Time left ( ${timeLeft}s )`}</h1>
        </div>
      }
      {
        recording && <>
          <Player
            autoplay={recording}
            loop
            src={recordingAnimation}
            style={{ height: "64px", width: "100%" }}
          />
          {/* <div>
          <iframe className="h-16 w-full" src="https://lottie.host/embed/38cc99df-f6ab-4d32-84c5-2530b6912ef6/W9L7BDPDVE.lottie"></iframe>
        </div> */}
        </>

      }
      <div className={`flex items-center mt-3 ${recording ? 'justify-center' : ''}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={() => (recording ? stop() : start())}
              className={`text-white transition font-medium  ${recording ? "bg-red-600 hover:bg-red-500 hover:scale-110" : "bg-[#064e47] hover:bg-[#064e47] hover:scale-110"
                }`}
            >
              {recording ? <Pause /> : <Mic />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {recording ? 'Stop Recording' : 'Start Recording'}
          </TooltipContent>
        </Tooltip>

        {
          recording &&
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="ml-5"
                onClick={cencel}
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Cancel Recording
            </TooltipContent>
          </Tooltip>

        }

      </div>
      <PermissionHelpModal
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </>
  );
}
