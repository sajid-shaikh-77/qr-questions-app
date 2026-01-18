import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader } from '../components/ui'
import RecorderNew from '../components/features/RecoderNew'

const Home = () => {
  const [savedAudio, setSavedAudio] = useState(null)
  const [text, setText] = useState("")

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
            <textarea
              className="w-full border rounded p-3"
              placeholder="Your question"
              value={text}
              onChange={e => setText(e.target.value)}
            />

            {!savedAudio && (
              <RecorderNew onSave={handleSaveAudio} />
            )}

            {savedAudio && (
              <div className="mt-4">
                <p className="text-sm font-medium">
                  Recorded audio preview:
                </p>
                <audio controls src={savedAudio.dataUrl} className="w-full mt-2" />

                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setSavedAudio(null)}
                >
                  Re-record
                </Button>
              </div>
            )}

            <div className="mt-4 flex justify-center items-center">
              <Button
                type="submit"
                className="bg-[#064e47] text-white min-w-35 hover:bg-[#064e47]"
              >
                Submit Question
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
