import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'important' | 'default'
  size?: 'default' | 'long'
} & React.ComponentPropsWithoutRef<'button'>

const Button = ({ children, variant = 'default', size = 'default' }: Props) => {
  return (
    <>
      {variant === 'important' ? (
        <button className="p-1 rounded-md bg-gradient-to-r from-orange-400 to-fuchsia-500">
          <span className="block px-4 py-2 rounded bg-black text-white hover:bg-gray-500">
            {children}
          </span>
        </button>
      ) : (
        <button className="bg-orange-500 text-white block px-5 py-3 rounded hover:bg-orange-300">
          {children}
        </button>
      )}
    </>
  )
}

export default Button
