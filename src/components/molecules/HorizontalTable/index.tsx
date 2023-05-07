type Props = {
  title?: string
  rounds: { set: string; summary: string; memo?: string }[]
} & React.ComponentPropsWithoutRef<'table'>

const HorizontalTable = ({ title, rounds }: Props) => {
  return (
    <>
      {title && <p className="pb-2 pl-2">{title}</p>}
      <table className="shadow-md w-full border-collapse">
        <tbody>
          {rounds.map((round, index) => (
            <>
              <tr key={index}>
                <th
                  className="border-b-2 p-2 mr-4 bg-sky-50 text-blue-900 rounded-lg"
                  scope="row"
                >
                  {round.set}
                </th>
                <td key={index} className="border-b-2 px-4">
                  <p>{round.summary}</p>
                </td>
              </tr>
              {round.memo && (
                <tr>
                  <th className="text-sm bg-orange-50">メモ</th>
                  <td>
                    <p className="text-xs bg-orange-50 p-1">{round.memo}</p>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default HorizontalTable
