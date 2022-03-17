import { Divider, Heading, HStack, VStack, Text, Link } from '@chakra-ui/react'
import { marketPlaceByChain } from 'src/utils'
import { useStore } from 'src/utils/stores/ui'
import { Token } from 'types/graphql'

const TokenDetailInfo = (token: Token) => {
  const { chain, account } = useStore((s) => s)
  return (
    <VStack alignItems={'start'} w="full">
      <Heading size={'md'}>Details</Heading>
      <Divider colorScheme={'green'} />
      <HStack w="full">
        <Text w={20} mr={2} fontWeight={'bold'}>
          Type:{' '}
        </Text>
        <Text fontSize={'sm'} maxW={80}>
          {token.contractType}
        </Text>
      </HStack>
      <HStack w="full">
        <Text w={20} mr={2} fontWeight={'bold'}>
          Symbol:{' '}
        </Text>
        <Text fontSize={'sm'} maxW={80}>
          {token.symbol}
        </Text>
      </HStack>
      <HStack w="full">
        <Text w={20} mr={2} fontWeight={'bold'}>
          Name:{' '}
        </Text>
        <Text fontSize={'sm'} maxW={80}>
          {token.tokenName}
        </Text>
      </HStack>
      <Divider colorScheme={'green'} />
      <HStack w="full">
        <Text w={20} mr={2} fontWeight={'bold'}>
          TokenId:{' '}
        </Text>
        <Text isTruncated fontSize={'sm'} maxW={80}>
          {token.tokenId}
        </Text>
      </HStack>
      <Divider colorScheme={'green'} />
      <HStack w="full">
        <Text w={20} mr={2} fontWeight={'bold'}>
          Address:{' '}
        </Text>
        <Link
          isExternal
          href={marketPlaceByChain(chain, 'etherscan', token.contractAddress, '')}
          color={'green.400'}
          isTruncated
          fontSize="sm"
          maxW={80}
        >
          {token.contractAddress}
        </Link>
      </HStack>
      <Divider colorScheme={'green'} />
      <HStack w="full">
        <Text w={20} mr={2} fontWeight={'bold'}>
          Owner:{' '}
        </Text>
        <Link
          isExternal
          href={marketPlaceByChain(chain, 'etherscan', token.owner, '')}
          color={'green.400'}
          isTruncated
          fontSize="sm"
          maxW={80}
        >
          {token.owner}
        </Link>
      </HStack>
      <Divider colorScheme={'green'} />
    </VStack>
  )
}

export default TokenDetailInfo
