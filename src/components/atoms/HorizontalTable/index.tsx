type Props = {
  title?: string
  array: [string, ...string[]][]
} & React.ComponentPropsWithoutRef<'table'>

const HorizontalTable = ({ title, array }: Props) => {
  return (
    <>
      {title && <p className="pb-2 pl-2">{title}</p>}
      <table className="shadow-md w-full">
        <tbody>
          {array.map((tuple, index) => (
            <tr key={index}>
              <th
                className="border-b-2 p-2 mr-4 bg-sky-50 text-blue-900 rounded-lg"
                scope="row"
              >
                {tuple[0]}
              </th>
              {tuple.map(
                (t, index) =>
                  index !== 0 && (
                    <td key={index} className="border-b-2 px-4">
                      {t}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default HorizontalTable
