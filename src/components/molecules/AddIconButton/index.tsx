import { PlusCircleIcon } from '@heroicons/react/24/solid'

import IconButton from '@/components/atoms/IconButton'

type Props = {
  text?: string
} & React.ComponentPropsWithoutRef<'button'>

const AddIconButton = ({ text, ...props }: Props) => {
  return (
    <IconButton
      {...props}
      icon={<PlusCircleIcon className="w-6 h-6" />}
      text={text}
    />
  )
}

export default AddIconButton
