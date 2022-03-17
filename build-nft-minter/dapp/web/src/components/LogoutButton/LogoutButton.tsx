import { Button } from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
const LogoutButton = () => {
  const { logOut, loading } = useAuth()
  return (
    <Button
      isLoading={loading}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      rounded="full"
      bg={'red.400'}
      _hover={{
        bg: 'red.300',
      }}
      onClick={logOut}
    >
      Disconnect wallet
    </Button>
  )
}

export default LogoutButton
