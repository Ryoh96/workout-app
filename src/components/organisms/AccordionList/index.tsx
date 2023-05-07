import type { ReactNode, RefObject } from 'react'
import { createRef, useMemo, useRef, useState } from 'react'

import Accordion from '../Accordion'

type Props = {
  items: {
    title: string
    content: JSX.Element
    tags?: string[]
  }[]
}

const AccordionList = ({ items }: Props) => {
  const itemLength = useMemo(() => items.length, [items])
  const [defaultOpen, setDefaultOpen] = useState(true)

  return (
    <>
      {itemLength === 0 ? (
        <p>データがありません</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <div key={index} className="w-full">
              <Accordion
                title={item.title}
                defaultOpen={defaultOpen}
                tags={item.tags}
              >
                {item.content}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default AccordionList
