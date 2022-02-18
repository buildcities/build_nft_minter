import { MetaTags } from '@redwoodjs/web'
import AssetList from 'src/components/AssetsCell'

const AssetsPage = () => {
  return (<>
    <MetaTags title="Assets" description="Assets page" />

    <AssetList type={'video'}/>
  </>

  )
}

export default AssetsPage
