import CardItem, { CardItemProps } from "../CardItem/CardItem"
import { AddIcon } from '@chakra-ui/icons'
import { Button, Center, LinkBox, LinkOverlay } from "@chakra-ui/react"

interface CardItemButtonProps extends CardItemProps {
  onClick?: () => void
}

const CardItemButton = ({ onClick, ...props }: CardItemButtonProps) => {
  return (

    <CardItem {...props} >
      <Center height={230} w={282}>
        <LinkOverlay href='#' onClickCapture={onClick}><AddIcon fontSize={32} /></LinkOverlay>
      </Center>
    </CardItem>


  )
}

export default CardItemButton
