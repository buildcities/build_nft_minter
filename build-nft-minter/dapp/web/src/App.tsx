import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider } from '@redwoodjs/auth'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import { init } from '../auth/moralis-client'
import './index.css'
import { CloudStorageProvider } from 'src/utils/firebase/provider'
import Web3Provider from './components/Web3Provider/Web3Provider'
import { theme } from './theme'

const client = init(process.env.MORALIS_SERVER_URL, process.env.MORALIS_API_ID)

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        {client && (
          <AuthProvider client={client} type="custom">
            <ColorModeScript />
            <ChakraProvider theme={theme}>
              <RedwoodApolloProvider>
                <Web3Provider>
                  <CloudStorageProvider>
                    <Routes />
                  </CloudStorageProvider>
                </Web3Provider>
              </RedwoodApolloProvider>
            </ChakraProvider>
          </AuthProvider>
        )}
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
