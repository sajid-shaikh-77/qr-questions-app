import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Tooltip, TooltipContent, TooltipTrigger } from '../components/ui'
import RecorderNew from '../components/features/RecoderNew'

const Home = () => {
  const [savedAudio, setSavedAudio] = useState(null)
  const [text, setText] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  function handleSaveAudio({ blob, dataUrl }) {
    setSavedAudio({ blob, dataUrl });
  }

  async function submitQuestion(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (savedAudio) {
      formData.append("audio", savedAudio.blob);
    }

    // await fetch("/api/questions", {
    //   method: "POST",
    //   body: formData
    // });

    alert("Question submitted");
    setSavedAudio(null);
    setText("");
  }

  const handleCancelSubmit = () => {
    setSavedAudio(null)
    setText("")
    setIsRecording(null)
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <h1 className='font-semibold text-2xl text-[#064e47]'>
            Ask your Question
          </h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitQuestion}>
            {
              !isRecording && !savedAudio ? (
                <textarea
                  className="w-full border rounded p-3"
                  placeholder="Type your question"
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
              ) : <></>
            }


            {!savedAudio && (
              <>
              <h1 className='font-bold mt-3'>Record your question</h1>
              <RecorderNew
                onSave={handleSaveAudio}
                text={text}
                setText={setText}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />
              </>
            )}

            {savedAudio && (
              <div className="mt-4">
                <p className="text-sm font-medium">
                  Recorded audio preview:
                </p>
                <audio controls src={savedAudio.dataUrl} className="w-full mt-2" />

                {/* <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setSavedAudio(null)}
                >
                  Re-record
                </Button> */}
              </div>
            )}

            {text !== "" || savedAudio ?
              (
                <div className="mt-4 flex justify-center items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        className="bg-[#064e47] text-white min-w-35 hover:bg-[#064e47] cursor-pointer"
                      >
                        Submit Question
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Submit
                    </TooltipContent>
                  </Tooltip>
                  {/* Cancel */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant='outline'
                        onClick={handleCancelSubmit}
                        className="bg-red-700 text-white min-w-35 hover:bg-red-700 hover:text-white  cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Cancel
                    </TooltipContent>
                  </Tooltip>

                </div>
              ) : (
                null
              )
            }

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
