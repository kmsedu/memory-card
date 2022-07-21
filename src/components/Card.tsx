import { Cat } from '../App'

interface CardProps {
  cat: Cat
  toggleSelected: Function
}

export default function Card (props: CardProps): JSX.Element {
  const { cat, toggleSelected } = props

  return (
    <div>
      <img src={cat.url} className='object-cover w-48 h-48 rounded-xl' onClick={() => toggleSelected(cat.id)} />
    </div>
  )
}
