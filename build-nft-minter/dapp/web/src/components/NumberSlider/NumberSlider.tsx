import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderProps,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react'
import { useState } from 'react'
import CustomFormInput, {
  CustomFormInputProp,
} from 'src/components/CustomFormInput/CustomFormInput'

interface NumberSliderProps extends SliderProps {
  name: string
}

const NumberSlider = (props: NumberSliderProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <CustomFormInput  name={props.name}  label=''>
      {(field) => (
        <Slider
          id="slider"
          defaultValue={0}
          colorScheme="green"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...props}
          {...field}
        >
          <SliderMark value={field?.value} mt="2" ml="-2.5" fontWeight={"bold"} fontSize="xs">
            {showTooltip?"":`Rarity: ${field?.value}`}
          </SliderMark>
          <SliderTrack  borderRadius={"full"} h={2}>
            <SliderFilledTrack h={2}  borderRadius={"full"} />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="green.400"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`Rarity: ${field?.value}`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      )}
    </CustomFormInput>
  )
}

NumberSlider.defaultProps = {
  min: 0,
  max: 10,
}

export default NumberSlider
