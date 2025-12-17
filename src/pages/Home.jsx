import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Textarea } from '../components/ui'
import { Mic } from 'lucide-react'
import Recorder from '../components/features/Recoder'

const Home = () => {
  const [savedAudio, setSavedAudio] = useState('sajid')
  const [text, setText] = useState()
  const decoded = decodeURIComponent('unknown');
  async function handleSaveAudio({ blob, dataUrl }) {
    setSavedAudio({ blob, dataUrl });
  }
  const submitQuestion = () => {

  }
  return (
    <div className='flex flex-col item-center justify-center max-w-4xl mx-auto p-6'>
      <section className='rounded-xl p-6 bg-white shadow crescent-bg'>
        {/* <Card className={`bg-white shadow crescent-bg`}>
          <CardHeader>
            <CardTitle>
              <h1 className='font-semibold text-2xl text-[#064e47]'>Ask your Question</h1>
            </CardTitle>
          </CardHeader>
        </Card> */}
              <h1 className='font-semibold text-2xl text-[#064e47]'>Ask your Question</h1>
      </section>
      <section className='mt-6'>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <p>Type your question (any language)</p>
            <form action="">
              <Textarea placeholder='Your question' className={`mt-3`} />
              {/* <Button className={`mt-3 bg-[#064e47] text-white cursor-pointer`} type='button' variant='outline' size='icon' aria-label="Record" >
                <Mic />
              </Button> */}
              <Recorder onSave={handleSaveAudio} />
              {savedAudio && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Recorded audio preview:</p>
                  <audio controls src={savedAudio.dataUrl} className="mt-2 w-full" />
                  <div className="mt-2">
                    <Button variant='outline cursor-pointer' className="px-3 py-2 border" onClick={() => setSavedAudio(null)}>Remove Recording</Button>
                  </div>
                </div>
              )}
              <div className='mt-3'>
                <Button className={`bg-[#064e47] text-white cursor-pointer min-w-36.25`}>Submit Question</Button>
                <Button className={`ml-5 cursor-pointer`} variant='outline'>Back</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Home