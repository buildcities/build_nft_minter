import { Box, Heading, useDisclosure } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import AssetForm from 'src/components/AssetForm/AssetForm'
import AssetList from 'src/components/AssetsCell'
import CardItemButton from 'src/components/CardItemButton/CardItemButton'
import SideDrawer from 'src/components/SideDrawer/SideDrawer'
const HEADER = 'Create new asset'

const AssetsPage = () => {
  const { onOpen, onClose, ...props } = useDisclosure()
  return (
    <Box py={[2, 5]}>
      <MetaTags title="Assets" description="Assets page" />
      <Heading pl={10} pb={5}>
        Assets
      </Heading>
      <AssetList onOpen={onOpen} type={'video'}>
        <CardItemButton onClick={onOpen} subTitle="Add" title="New Asset" />
      </AssetList>
      <SideDrawer header={HEADER} onClose={onClose} {...props}>
        <AssetForm onClose={onClose} />
      </SideDrawer>
    </Box>
  )
}

export default AssetsPage
