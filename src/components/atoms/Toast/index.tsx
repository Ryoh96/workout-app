import { ToastContainer } from 'react-toastify'
import type { ToastProps } from 'react-toastify/dist/types'

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

const Toast = (props: Partial<ToastProps>) => (
  <ToastContainer
    {...defaultProps}
    {...props}
    style={{ zIndex: 99999 }}
    data-testid="toast"
  />
)

export default Toast
