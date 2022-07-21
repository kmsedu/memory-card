import { Cat } from '../App'

interface CardProps {
  cat: Cat
  toggleSelected: Function
  handleCatClick: Function
}

export default function Card (props: CardProps): JSX.Element {
  const { cat, toggleSelected, handleCatClick } = props

  return (
    <div>
      <img
        src={cat.url}
        className='object-cover w-48 h-48 rounded-xl'
        onClick={() => handleCatClick(cat.id)}
      />
    </div>
  )
}
