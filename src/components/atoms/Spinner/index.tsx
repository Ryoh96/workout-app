type Props = {
  variant?: 'default' | 'small' | "white"
  color?: "default" | "white"
}

const Spinner = ({ variant = 'default', color = "default" }: Props) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-red-600 border-t-transparent mx-auto ${
        variant === 'default' && '!h-8 !w-8 '
      }  ${variant === 'small' && 'my-0 !h-4 !w-4'}
      ${color === "white" && '!border-white !border-t-transparent'}`
    }
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    />
  )
}

export default Spinner
