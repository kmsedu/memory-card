interface CardProps {
  imageUrl: string
}

export default function Card (props: CardProps): JSX.Element {
  const { imageUrl } = props
  return (
    <div>
      <img src={imageUrl} className='object-cover w-48 h-48 rounded-xl' />
    </div>
  )
}
