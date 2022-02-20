import { Flex, HStack, useDisclosure } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import AssetForm from 'src/components/AssetForm/AssetForm'
import AssetList from 'src/components/AssetsCell'
import CardItemButton from 'src/components/CardItemButton/CardItemButton'
import SideDrawer from 'src/components/SideDrawer/SideDrawer'
const HEADER = 'Create new asset'
const AssetsPage = () => {

  const { onOpen, ...props } = useDisclosure()
  return (<>
    <MetaTags title="Assets" description="Assets page" />
    <AssetList type={'video'} >
      <CardItemButton onClick={onOpen} subTitle='Add' title='New Asset' />
    </AssetList>
    <SideDrawer header={HEADER} {...props}>
      <AssetForm />
    </SideDrawer>
  </>

  )
}

export default AssetsPage
