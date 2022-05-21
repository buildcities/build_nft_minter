import Icon from '@chakra-ui/icon'
import {
  Box,
  HStack,
  useRadio,
  useRadioGroup,
  VStack,
  Text,
  Link,
  Badge,
} from '@chakra-ui/react'
import { render } from 'react-dom'

// 1. Create a component that consumes the `useRadio` hook
function RadioCardOption(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        w={150}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          borderColor: 'green.300',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export type RadioCardOptionProps = {
  label: string
  value: string
  description?: string
  icon?: any
  url?: string
  hasComingSoon?: boolean
  disabled?: boolean
}

type RadioCardProps = {
  options?: RadioCardOptionProps[]
  name: string
  defaultValue?: string
  onChange?: (value?: any) => void
  value?: any
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
const RadioCard = ({
  options,
  name,
  onChange,
  value,
  defaultValue,
}: RadioCardProps) => {
  //const options = ['react', 'vue', 'svelte']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
    value,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options?.length &&
        options.map((value) => {
          const radio = getRadioProps({ value: value.value })
          return (
            <RadioCardOption key={value.value} {...radio}>
              <VStack>
                {value.icon && (
                  <Icon
                    color={radio.isChecked ? 'green.300' : 'black'}
                    as={value.icon}
                  />
                )}
                <Text
                  color={radio.isChecked ? 'green.400' : 'black'}
                  fontSize={'sm'}
                >
                  {value.label}
                  {value.hasComingSoon && (
                    <Badge
                      ml={1}
                      rounded="lg"
                      variant={'subtle'}
                      fontSize={'xs'}
                      colorScheme="green"
                    >
                      soon
                    </Badge>
                  )}
                </Text>
                {value?.description && (
                  <Link href={value?.url} color={'gray.400'} fontSize={'xs'}>
                    {value?.description}
                  </Link>
                )}
              </VStack>
            </RadioCardOption>
          )
        })}
    </HStack>
  )
}

export default RadioCard
