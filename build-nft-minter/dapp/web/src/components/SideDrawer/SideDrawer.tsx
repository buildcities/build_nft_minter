import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, DrawerProps, UseDisclosureProps } from "@chakra-ui/react"


interface SideDrawerProps extends UseDisclosureProps {
  footerComponent?: React.ReactChild
  header?: string
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, children, footerComponent, header }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size='lg'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{header}</DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>

        <DrawerFooter>
          {footerComponent && footerComponent}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}

export default SideDrawer
