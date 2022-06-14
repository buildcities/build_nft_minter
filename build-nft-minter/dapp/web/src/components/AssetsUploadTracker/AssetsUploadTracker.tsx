import { Box } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'
import { useEffect } from 'react'

type AssetsUploadTrackerProps = {
  activeStep?: number
  nextStep?: () => void
  prevStep?: () => void
  reset?: () => void
  state?: 'loading' | 'error' | null
  steps?: { label?: string; icon?: any; description?: string }[]
}

const AssetsUploadTracker = ({
  activeStep,
  steps,
  state,
  reset,
}: AssetsUploadTrackerProps) => {
  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <Steps
      state={state}
      w="full"
      orientation="vertical"
      activeStep={activeStep}
    >
      {steps?.length &&
        steps.map(({ label, icon, description }, index) => (
          <Step
            width={'full'}
            icon={icon}
            label={label}
            description={description}
            key={label}
          />
        ))}
    </Steps>
  )
}

export default AssetsUploadTracker
