import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { size } from 'lodash'

interface ModalViewProps extends ModalProps {
  footerComponents?: React.ReactNode
  children?: any
}

const ModalView: React.FC<ModalViewProps> = ({
  children,
  onClose,
  isOpen,
  footerComponents,
  ...props
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} {...props}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
      />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footerComponents && <ModalFooter>{footerComponents}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}

export default ModalView
