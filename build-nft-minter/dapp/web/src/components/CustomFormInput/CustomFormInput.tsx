import { useFormContext, Controller } from 'react-hook-form'
import FormControl, { FormControlProps } from '../FormControl/FormControl'

export interface CustomFormInputProp extends FormControlProps {
  
  children?: (payload: any) => React.ReactElement
}

const CustomFormInput = ({ children, ...props }: CustomFormInputProp) => {
  const { control } = useFormContext()
  return (
    <FormControl {...props}>
      {(_props) => (
        <Controller
          control={control}
          render={({ field }) => children(field)}
          {..._props}
        />
      )}
    </FormControl>
  )
}

export default CustomFormInput
