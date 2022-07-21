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
  const [score, setScore] = useState(0)
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

  const shuffleArray = (arr: Cat[]): Cat[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  const toggleSelected = (id: string): void => {
    const selectedCat = cats.find((cat) => cat.id === id)
    if (selectedCat?.selected ?? false) {
      setCats((prevCats) => {
        return prevCats.map((cat) => {
          cat.selected = false
          return cat
        })
      })
      return
    }
    setCats((prevCats) => {
      return prevCats.map((cat: Cat) => {
        if (cat.id === id) {
          cat.selected = true
        }
        return cat
      })
    })
  }

  const handleCatClick = (id: string): void => {
    setCats((prevCats) => {
      return shuffleArray([...prevCats])
    })
    toggleSelected(id)
    setScore(cats.filter((cat) => cat.selected).length + 1)
  }

  const cardElements = cats.map((catObj: Cat) => {
    return (
      <Card
        cat={catObj}
        key={catObj.id}
        toggleSelected={toggleSelected}
        handleCatClick={handleCatClick}
      />
    )
  })

  return (
    <div className='App'>
      <h1 className='text-center text-3xl my-10'>Memory Cat Game</h1>
      <div className='grid grid-cols-5 grid-rows-2 place-content-center place-items-center gap-6'>
        {cardElements}
      </div>
      <p className='text-center text-xl my-10'>Score: {score} </p>
    </div>
  )
}

export default App
