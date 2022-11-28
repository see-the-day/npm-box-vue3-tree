export interface FanShapeOptions {
  color: string|number,
  transparent: boolean,
  opacity: number,
  startAngle: number,
  endAngle: number,
  radius: number,
  depth: number
}

export interface PieDataObj {
  value: number,
  color: string|number
}

export type PieData = PieDataObj[]

export interface EntryOption {
  color: string|number,
  startAngle: number,
  endAngle: number
}
