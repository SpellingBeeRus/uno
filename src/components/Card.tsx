import { Box, Text, Tooltip } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { Card as CardType } from '../types'

interface CardProps {
  card: CardType
  onClick?: () => void
  isPlayable?: boolean
  isHighlighted?: boolean
}

const colorMap = {
  red: 'red.500',
  blue: 'blue.500',
  green: 'green.500',
  yellow: 'yellow.500',
  black: 'gray.800',
}

const colorNames = {
  red: 'Красный',
  blue: 'Синий',
  green: 'Зеленый',
  yellow: 'Желтый',
  black: 'Черный',
}

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff; }
  50% { box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff; }
  100% { box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff; }
`

const Card = ({ card, onClick, isPlayable = true, isHighlighted = false }: CardProps) => {
  const getSymbol = (value: CardType['value']) => {
    switch (value) {
      case 'skip':
        return '⊘'
      case 'reverse':
        return '⟲'
      case 'draw2':
        return '+2'
      case 'wild':
        return '🌈'
      case 'wildDraw4':
        return '+4'
      default:
        return value
    }
  }

  const cardColor = card.selectedColor ? colorMap[card.selectedColor as keyof typeof colorMap] : colorMap[card.color]
  const colorName = card.selectedColor ? colorNames[card.selectedColor as keyof typeof colorNames] : colorNames[card.color]

  return (
    <Tooltip 
      label={`${colorName} ${typeof card.value === 'number' ? card.value : ''}`}
      isDisabled={!card.selectedColor}
    >
      <Box
        width={{ base: "70px", md: "100px" }}
        height={{ base: "98px", md: "140px" }}
        bg={cardColor}
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={isPlayable ? 'pointer' : 'default'}
        onClick={isPlayable ? onClick : undefined}
        position="relative"
        transform="rotate(0deg)"
        transition="all 0.2s"
        _hover={{
          transform: isPlayable ? 'rotate(-5deg) translateY(-5px)' : 'none',
          boxShadow: isPlayable ? 'lg' : 'none',
        }}
        boxShadow="md"
        opacity={isPlayable ? 1 : 0.8}
        animation={isHighlighted ? `${glowAnimation} 2s infinite` : undefined}
      >
        {/* Верхний левый угол */}
        <Box position="absolute" top={2} left={2}>
          <Text color="white" fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">
            {getSymbol(card.value)}
          </Text>
        </Box>

        {/* Центральный символ */}
        <Text
          color="white"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0,0,0,0.4)"
        >
          {getSymbol(card.value)}
        </Text>

        {/* Нижний правый угол (перевернутый) */}
        <Box position="absolute" bottom={2} right={2} transform="rotate(180deg)">
          <Text color="white" fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">
            {getSymbol(card.value)}
          </Text>
        </Box>

        {/* Индикатор выбранного цвета для черных карт */}
        {card.selectedColor && (
          <Box
            position="absolute"
            top={1}
            right={1}
            width="16px"
            height="16px"
            borderRadius="full"
            bg={colorMap[card.selectedColor as keyof typeof colorMap]}
            border="2px solid white"
          />
        )}

        {/* Декоративный элемент */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="80%"
          height="80%"
          borderRadius="full"
          border="2px solid"
          borderColor="whiteAlpha.300"
          pointerEvents="none"
        />
      </Box>
    </Tooltip>
  )
}

export default Card 