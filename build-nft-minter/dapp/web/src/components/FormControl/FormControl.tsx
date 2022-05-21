import { VStack, Text, chakra, StyleProps, Box,useColorModeValue } from '@chakra-ui/react'
import { Label, FieldError as _FieldError } from '@redwoodjs/forms'
const FieldError = chakra(_FieldError)
interface FormControlChild extends StyleProps {
  name: string
}

export interface FormControlProps extends StyleProps {
  name?: string
  children?: (payload: FormControlChild) => React.ReactNode
  helperText?: string
  description?: string
  label?: string
}

const _Label = chakra(Label)

const FormControl = ({
  name,
  children,
  helperText,
  description,
  label,
  ...props
}: FormControlProps) => {
  //const Children = children && chakra(children)
  return (
    <VStack w="full" align="start" spacing={2}>
      <Box>
        {label &&<_Label fontSize={'sm'} fontWeight="bold" name={name}>
          {label}
        </_Label>}
        {description && (
          <Text fontSize="sm" color={useColorModeValue("gray.600","white")}>
            {description}
          </Text>
        )}
      </Box>
      {children && children({ name, ...props })}
      {helperText && <Text fontSize="sm">{helperText}</Text>}
      <FieldError fontSize="sm" color="crimson" name={name} />
    </VStack>
  )
}

export default FormControl
