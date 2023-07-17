import clsx from 'clsx'
import type { ReactNode } from 'react'

import Spinner from '../Spinner'

type Props = {
  children: ReactNode
  variant?: 'important' | 'default'
  size?: 'default' | 'long'
  loading?: boolean
} & React.ComponentPropsWithoutRef<'button'>

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  disabled,
  loading = false,
  ...props
}: Props) => {
  return (
    <>
      {variant === 'important' ? (
        <button
          className={clsx(
            'p-1 rounded-md bg-gradient-to-r from-orange-400 to-fuchsia-500 text-sm  min-w-[90px] disabled:from-orange-800 disabled:to-fuchsia-800 disabled:text-gray-300',
            className
          )}
          {...props}
          disabled={loading || disabled}
        >
          <span
            className={`block px-3 py-2.5 rounded bg-black text-white hover:bg-gray-500 ${
              loading && 'disabled'
            }`}
          >
            {loading ? <Spinner variant="small" color="white" /> : children}
          </span>
        </button>
      ) : (
        <button
          className={clsx(
            'bg-orange-600 text-white block px-3 py-3 rounded shadow-md hover:bg-orange-300 text-sm min-w-[90px] disabled:bg-orange-800 disabled:text-gray-300',
            className
          )}
          {...props}
          disabled={loading || disabled}
        >
          {loading ? <Spinner variant="small" color="white" /> : children}
        </button>
      )}
    </>
  )
}

export default Button
