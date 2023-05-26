import { toast } from 'react-toastify'
import type { ToastProps } from 'react-toastify/dist/types'

const useToast = () => {
  const defaultProps: Partial<ToastProps> = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    type: 'error',
  }
  const notify = (text: string, props?: Partial<ToastProps>) =>
    toast(text, {
      ...defaultProps,
      ...props,
    })

  return notify
}

export default useToast
