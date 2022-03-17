import {
  Box,
  Center,
  Heading,
  useDisclosure,
  LinkOverlay,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { MetaTags } from '@redwoodjs/web'
import CollectionForm from 'src/components/CollectionForm/CollectionForm'
import CardItem from 'src/components/CardItem/CardItem'
import SideDrawer from 'src/components/SideDrawer/SideDrawer'
import CollectionList from 'src/components/CollectionsCell'
import { collectionFormInputs } from 'src/types'
import { createCollection } from 'src/utils'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useStore } from 'src/utils/stores/ui'

const HEADER = 'Mint a token'

const TokensPage = () => {
  const { onOpen, onClose, ...props } = useDisclosure()
  const [busy, setBusy] = useState(false)
  const { chain, account } = useStore((s) => s)
  const client = useApolloClient()
  //const [walletActive, setwalletActive] = useState(false)

  const onSubmit = async (payload: collectionFormInputs) => {
    setBusy(true)
    const result = await createCollection(payload)
    console.log(result)
    client
      .refetchQueries({
        include: 'active',
      })
      .then(() => {
        onClose()
      })
      .catch((e) => e)
      .finally(() => {
        setBusy(false)
      })
  }
  return (
    <Box py={[2, 5]}>
      <MetaTags title="Collections" description="Collections page" />
      <Heading pl={10} pb={5}>
        Collections
      </Heading>

      <CollectionList onOpen={onOpen} owner={account} chain={chain}>
        <CardItem title="Create new" subTitle="Collection">
          <Center>
            <LinkOverlay href="#" onClickCapture={onOpen}>
              <AddIcon
                p="8"
                w="24"
                h="24"
                rounded={'full'}
                color="white"
                bgColor="green.500"
              />
            </LinkOverlay>
          </Center>
        </CardItem>
      </CollectionList>

      <SideDrawer header={HEADER} onClose={onClose} {...props}>
        <CollectionForm isBusy={busy} onSubmit={onSubmit} />
      </SideDrawer>
    </Box>
  )
}

export default TokensPage
