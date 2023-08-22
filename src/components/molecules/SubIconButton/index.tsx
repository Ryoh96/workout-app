import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid'

import IconButton from '@/components/atoms/IconButton'

type Props = {
  text?: string
} & React.ComponentPropsWithoutRef<'button'>

const SubIconButton = ({ text, ...props }: Props) => {
  return (
    <IconButton
      {...props}
      icon={<MinusCircleIcon className="w-6 h-6" />}
      text={text}
    />
  )
}

export default SubIconButton
