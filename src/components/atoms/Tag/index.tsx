import clsx from 'clsx'

type Props = {
  children: string
} & React.ComponentPropsWithoutRef<'span'>

const Tag = ({ children, className }: Props) => {
  return (
    <span
      className={clsx(
        'py-0.5 px-2 bg-rose-800 text-white rounded text-sm whitespace-nowrap',
        className
      )}
      data-testid="tag"
    >
      {children}
    </span>
  )
}

export default Tag
