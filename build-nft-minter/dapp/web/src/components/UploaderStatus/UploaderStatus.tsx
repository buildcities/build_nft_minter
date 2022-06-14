import { Progress, VStack, Text, ProgressProps } from '@chakra-ui/react'

interface UploaderStatusProps extends ProgressProps {
  status?: string,
  description?: string,
}

const UploaderStatus = ({ status,description, ...props }: UploaderStatusProps) => {
  return (
    <VStack align={'start'} w="full">
      {status && <Text fontSize="xs">{status}</Text>}
      <Progress w="full" size="xs" colorScheme={'green'} hasStripe {...props} />
      {description && <Text fontSize="sm">{description}</Text>}
    </VStack>
  )
}

export default UploaderStatus
