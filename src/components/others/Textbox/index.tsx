import { forwardRef } from 'react'

import styles from './styles.module.css'

type Props = React.ComponentPropsWithRef<'input'>

export const Textbox = forwardRef<HTMLInputElement, Props>(function Textbox(
  { className, ...props },
  ref
) {
  return <input type="text" {...props} ref={ref} />
})
