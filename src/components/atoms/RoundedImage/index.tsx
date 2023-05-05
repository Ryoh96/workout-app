import Image from 'next/image'

type Props = Partial<React.ComponentPropsWithRef<typeof Image>>

const RoundedImage = (props: Props) => {
  return (
    <figure className="relative w-10 h-10">
      <Image
        src={props.src || ''}
        alt="icon"
        fill
        className="rounded-full border border-black w-fit static"
        style={{ objectFit: 'cover' }}
      />
    </figure>
  )
}

export default RoundedImage
