// import { assets, asset, createAsset, updateAsset } from './assets'
// import type { StandardScenario } from './assets.scenarios'

// // Generated boilerplate tests do not account for all circumstances
// // and can fail without adjustments, e.g. Float and DateTime types.
// //           Please refer to the RedwoodJS Testing Docs:
// //       https://redwoodjs.com/docs/testing#testing-services
// // https://redwoodjs.com/docs/testing#jest-expect-type-considerations

// describe('assets', () => {
//   scenario('returns all assets', async (scenario: StandardScenario) => {
//     const result = await assets({ walletAddress: null })

//     expect(result.length).toEqual(Object.keys(scenario.asset).length)
//   })

//   scenario('returns a single asset', async (scenario: StandardScenario) => {
//     const result = await asset({ id: scenario.asset.one.id })

//     expect(result).toEqual(scenario.asset.one)
//   })

//   scenario('creates a asset', async () => {
//     const result = await createAsset({
//       input: {
//         name: 'String2968735',
//         walletAddress: 'wallet_address',
//         asset: 'asset',
//         isDynamic: true,
//       },
//     })

//     expect(result.name).toEqual('String2968735')
//   })

//   scenario('updates a asset', async (scenario: StandardScenario) => {
//     const original = await asset({ id: scenario.asset.one.id })
//     const result = await updateAsset({
//       id: original.id,
//       input: { name: 'String53903712' },
//     })

//     expect(result.name).toEqual('String53903712')
//   })
// })
