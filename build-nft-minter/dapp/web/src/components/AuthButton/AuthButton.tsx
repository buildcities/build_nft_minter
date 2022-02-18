import { Button } from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'
const CTA_TEXT = 'Connect wallet'
const WELCOME_TEXT = 'Welcome build_ minter'
const AuthButton = () => {
  const { logIn, loading, isAuthenticated } = useAuth()
  const _login = async () => {
     await logIn({ signingMessage: WELCOME_TEXT })
  }
  return isAuthenticated ? (
    <Redirect to={routes.minter()} />
  ) : (
    <Button
      isLoading={loading}
      colorScheme={'green'}
      bg={'green.400'}
      rounded={'full'}
      onClick={_login}
      px={6}
      _hover={{
        bg: 'green.500',
      }}
    >
      {CTA_TEXT}
    </Button>
  )
}

export default AuthButton
