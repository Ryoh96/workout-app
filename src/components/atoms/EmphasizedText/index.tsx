type Props = {
  intro?: string
  content: string | number
  unit?: string
}

const EmphasizedText = ({ content, unit, intro = '前回' }: Props) => {
  return (
    <p className="text-sm text-sky-800">
      <span>{intro}</span>
      <span className="text-base font-bold px-0.5">{content}</span>
      <span>{unit}</span>
    </p>
  )
}

export default EmphasizedText
