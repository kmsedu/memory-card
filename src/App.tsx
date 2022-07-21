import Card from './components/Card'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

export interface Cat {
  url: string
  id: string
  selected: boolean
}

function App (): JSX.Element {
  const [cats, setCats] = useState<Cat[]>([])

  console.log(cats)

  useEffect(() => {
    async function fetchCats (): Promise<void> {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&mime_types=png,jpg')
      const data = await response.json()
      setCats(data.map((entry: {url: string}) => {
        return {
          url: entry.url,
          id: nanoid(),
          selected: false
        }
      }))
    }

    fetchCats().catch((error) => console.log(error))
  }, [])

  const toggleSelected = (id: string): void => {
    setCats((prevCats) => {
      return prevCats.map((cat: Cat) => {
        if (cat.id === id) {
          cat.selected = true
        }
        return cat
      })
    })
  }

  const cardElements = cats.map((catObj: Cat) => {
    return (
      <Card
        cat={catObj}
        key={catObj.id}
        toggleSelected={toggleSelected}
      />
    )
  })

  return (
    <div className='App'>
      <h1 className='text-center text-3xl my-10'>Memory Cat Game</h1>
      <div className='grid grid-cols-5 grid-rows-2 place-content-center place-items-center gap-6'>
        {cardElements}
      </div>
      <p className='text-center text-xl my-10'>Score: </p>
    </div>
  )
}

export default App
