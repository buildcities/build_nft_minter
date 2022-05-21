import { Button, ButtonProps } from '@chakra-ui/react'

interface AppButtonProps extends ButtonProps {
  title?: string
  color?: string
}

const AppButton = ({ title, color, ...props }: AppButtonProps) => {
  return (
    <Button
      size={'sm'}
      colorScheme={`${color}`}
      bg={`${color}.400`}
      rounded={'full'}
      _hover={{
        bg: `${color}.500`,
      }}
      {...props}
    >
      {title && title}
    </Button>
  )
}

export default AppButton
