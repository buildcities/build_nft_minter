import { Button } from '@chakra-ui/react'
import { back } from '@redwoodjs/router'
import { Moralis } from 'moralis'
import { useState } from 'react'

const ReAuthButton = () => {
  const [busy, setBusy] = useState(false)
  const handleReAuth = async () => {
    setBusy(true)
    await Moralis.enableWeb3()
    const isWeb3Enabled = await Moralis.isWeb3Enabled()
    setBusy(!!isWeb3Enabled)
    if (isWeb3Enabled) {
      back()
    }
  }
  return (
    <Button
      isLoading={busy}
      colorScheme={'green'}
      bg={'green.400'}
      rounded={'full'}
      onClick={handleReAuth}
      px={6}
      _hover={{
        bg: 'green.500',
      }}
    >
      Login
    </Button>
  )
}

export default ReAuthButton
