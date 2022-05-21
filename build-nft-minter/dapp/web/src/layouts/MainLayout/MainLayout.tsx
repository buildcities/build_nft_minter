import { Box } from '@chakra-ui/react'
import Header from 'src/components/Header/Header'

type MainLayoutProps = {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  )
}
  