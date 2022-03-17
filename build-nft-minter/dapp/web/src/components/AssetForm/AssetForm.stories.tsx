import AssetForm from './AssetForm'

export const generated = () => {
  return (
    <AssetForm
      onClose={function (): void {
        throw new Error('Function not implemented.')
      }}
    />
  )
}

export default { title: 'Components/AssetForm' }
