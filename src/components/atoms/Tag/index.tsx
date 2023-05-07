type Props = {
  children: string
}

const Tag = ({ children }: Props) => {
  return (
    <span className="py-0.5 px-2 bg-orange-900 text-white rounded text-sm whitespace-nowrap">
      {children}
    </span>
  )
}

export default Tag
