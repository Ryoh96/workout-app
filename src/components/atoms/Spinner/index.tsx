type Props = {
  variant?: 'default' | 'small'
}

const Spinner = ({ variant = 'default' }: Props) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-red-600 border-t-transparent mx-auto ${
        variant === 'default' && '!h-8 !w-8 '
      }  ${variant === 'small' && 'my-0 !h-4 !w-4'}`}
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    />
  )
}

export default Spinner
