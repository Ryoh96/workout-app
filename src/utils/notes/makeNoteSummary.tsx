const makeNoteSummary = (
  array: { heading: string; content: number; unit: string }[]
) => {
  return array.map(({ heading, content, unit }) => ({
    heading,
    content: (
      <span>
        <span className="text-lg  text-red-600 font-bold mr-1">{content}</span>
        <span>{unit}</span>
      </span>
    ),
  }))
}

export default makeNoteSummary
