import type { ReactNode } from 'react'
import React from 'react'

type Props = {
  title?: string
  titleIcon?: ReactNode
  data: { heading: string; content: ReactNode; others?: string }[]
  index?: number
  footer?: { title: string; content: ReactNode }
} & React.ComponentPropsWithoutRef<'table'>

const HorizontalTable = ({ title, data, titleIcon, index, footer }: Props) => {
  return (
    <div className="border border-gray-200 shadow">
      {title && (
        <div className="pb-2 pl-2 flex items-center justify-center pt-2 gap-2 font-bold bg-indigo-100 relative text-indigo-950">
          {index && <div className="absolute left-5">{index}.</div>}
          {titleIcon && titleIcon} <span>{title}</span>
        </div>
      )}
      <table className="border-collapse bg-white w-full ">
        <tbody data-testid="tableBody">
          {data.map((datum, index) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className="border-b-2 w-full"
                data-testid="tableRow"
              >
                <th
                  className="px-4 py-2 mr-4  text-blue-900 text-start"
                  scope="row"
                >
                  {datum.heading}
                </th>
                <td
                  key={index}
                  className="px-6 w-3/5 text-right whitespace-nowrap"
                >
                  {datum.content}
                </td>
              </tr>
              {datum.others && (
                <tr>
                  <th className="text-sm bg-orange-50">メモ</th>
                  <td>
                    <p className="text-xs bg-orange-50 p-1">{datum.others}</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              <th
                className="px-4 py-2 mr-4  text-blue-900 text-start  whitespace-nowrap"
                scope="row"
              >
                {footer.title}
              </th>
              <td className="px-6 w-3/5 text-right ml-auto whitespace-nowrap font-bold">
                {footer.content}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

export default HorizontalTable
