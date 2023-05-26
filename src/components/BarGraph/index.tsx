import { Bar, BarGraphContainer, FragmentBar } from './styles'

export interface BarGraphProps {
  size: number
  currentBar?: number
}

export function BarGraph({ size, currentBar = 1 }: BarGraphProps) {
  return (
    <BarGraphContainer>
      <Bar css={{ '--barGraph-size': size }}>
        {Array.from({ length: size }, (_, i) => i + 1).map((fragmentBar) => {
          return (
            <FragmentBar key={fragmentBar} active={currentBar >= fragmentBar} />
          )
        })}
      </Bar>
    </BarGraphContainer>
  )
}
