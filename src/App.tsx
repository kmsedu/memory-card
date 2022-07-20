import Card from './components/Card'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

function App (): JSX.Element {
  const [catImages, setCatImages] = useState([])

  useEffect(() => {
    async function fetchCats (): Promise<void> {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&mime-types=png')
      const data = await response.json()
      setCatImages(data.map((entry: {url: string}) => entry.url))
    }

    fetchCats().catch((error) => console.log(error))
  }, [])

  const cardElements = catImages.map((imageUrl) => {
    return (
      <Card imageUrl={imageUrl} key={nanoid()} />
    )
  })

  return (
    <div className='App'>
      <p className='text-xl text-red-600'>Boilerplate working</p>
      <div className='grid grid-cols-5 grid-rows-2 place-content-center place-items-center gap-6'>
        {cardElements}
      </div>
    </div>
  )
}

export default App
