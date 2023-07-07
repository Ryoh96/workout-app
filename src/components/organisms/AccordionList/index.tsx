import type { ReactNode, RefObject } from 'react'
import { createRef, useMemo, useRef, useState } from 'react'

import Accordion from '../Accordion'

type Props = {
  items: {
    title: string
    titleIcon: ReactNode
    content: JSX.Element
    tags?: string[]
  }[]
}

const AccordionList = ({ items }: Props) => {
  const itemLength = useMemo(() => items.length, [items])
  const [defaultOpen, setDefaultOpen] = useState(false)

  return (
    <>
      {itemLength === 0 ? (
        <p>データがありません</p>
      ) : (
        <div className="grid gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-md sm:max-w-none mx-auto">
          {items.map((item, index) => (
            <div key={index} className="w-full">
              <Accordion
                title={item.title}
                titleIcon={item.titleIcon}
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
