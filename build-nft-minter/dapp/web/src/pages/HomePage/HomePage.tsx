import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Slider,
  HStack,
  IconButton,
  Switch,
  useColorMode,
} from '@chakra-ui/react'
import AuthButton from 'src/components/AuthButton/AuthButton'

import { MAIN_TEXT_2, SUB_TEXT } from './presets'
export default function HomePage() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            {/* {MAIN_TEXT_1} <br /> */}
            <Text as={'span'} color={'green.400'}>
              {MAIN_TEXT_2}
            </Text>
          </Heading>
          <Text color={'gray.500'}>{SUB_TEXT}</Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <AuthButton />
            <HStack>
              <MoonIcon />
              <Switch
                isChecked={colorMode === 'light'}
                onChange={toggleColorMode}
                _focus={{ boxShadow: 'none' }}
                colorScheme={'green'}
              />
              <SunIcon />
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
