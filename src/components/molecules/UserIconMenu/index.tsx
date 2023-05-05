import UserIcon from '../UserIcon'

type Props = {
  isLogin: boolean
  src?: string
}

const UserIconMenu = (props: Props) => {
  return (
    <button className="flex items-center">
      <UserIcon {...props} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  )
}

export default UserIconMenu
