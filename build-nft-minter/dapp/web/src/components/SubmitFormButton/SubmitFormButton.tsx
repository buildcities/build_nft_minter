import { Button } from '@chakra-ui/react'

const SubmitFormButton: React.FC<{ isBusy?: boolean }> = ({
  isBusy,
  children,
}) => {
  return (
    <Button
      borderRadius={'full'}
      isLoading={isBusy}
      colorScheme="green"
      bg="green.400"
      color="white"
      _hover={{
        bg: 'green.500',
      }}
      isFullWidth
      type="submit"
    >
      {children}
    </Button>
  )
}

export default SubmitFormButton
