export const collectionAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beacon',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxy',
        type: 'address',
      },
    ],
    name: 'CreateDynaMintProxy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxy',
        type: 'address',
      },
    ],
    name: 'CreateDynaMintUserProxy',
    type: 'event',
  },
  {
    inputs: [],
    name: 'allCollections',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: '_contractAddress',
            type: 'address',
          },
        ],
        internalType: 'struct DynaMintFactory.Collection[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_maxSupply',
        type: 'uint256',
      },
    ],
    name: 'createToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ownerCollections',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: '_contractAddress',
            type: 'address',
          },
        ],
        internalType: 'struct DynaMintFactory.Collection[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
