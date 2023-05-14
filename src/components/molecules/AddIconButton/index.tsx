import IconButton from '@/components/atoms/IconButton'

type Props = {
  text?: string
} & React.ComponentPropsWithoutRef<'button'>

const AddIconButton = ({ text, ...props }: Props) => {
  return (
    <IconButton text={text} {...props}>
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </>
    </IconButton>
  )
}

export default AddIconButton
