import { Cat } from '../App'

interface CardProps {
  cat: Cat
  handleCatClick: Function
}

export default function Card (props: CardProps): JSX.Element {
  const { cat, handleCatClick } = props

  return (
    <div className='shadow-xl rounded-xl'>
      <img
        src={cat.url}
        className='object-cover w-48 h-48 rounded-xl hover:brightness-90 hover:cursor-pointer'
        onClick={() => handleCatClick(cat.id)}
      />
    </div>
  )
}
