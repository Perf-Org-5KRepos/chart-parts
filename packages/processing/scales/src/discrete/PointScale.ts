import { scalePoint } from 'd3-scale'
import { DomainRangeScale } from '../DomainRangeScale'
import { Dimension, CreateScaleArgs, Scales } from '@gog/interfaces'

export class PointScale extends DomainRangeScale<
	string[],
	[number, number],
	Dimension
> {
	private alignValue?: number
	private paddingValue?: number
	private roundValue?: boolean
	private stepNameValue?: string

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	public align(value: number) {
		this.alignValue = value
		return this
	}

	/**
	 * The outer and inner padding value
	 */
	public padding(value: number) {
		this.paddingValue = value
		return this
	}

	public round(value: boolean) {
		this.roundValue = value
		return this
	}

	public stepName(value?: string) {
		this.stepNameValue = value
		return this
	}

	protected createScale(args: CreateScaleArgs) {
		const scale = scalePoint()
			.domain(this.getDomain(args))
			.range(this.getRange(args))

		if (this.paddingValue !== undefined) {
			scale.padding(this.paddingValue)
		}

		if (this.alignValue !== undefined) {
			scale.align(this.alignValue)
		}

		if (this.roundValue !== undefined) {
			scale.round(this.roundValue)
		}

		const result: Scales = { [this.nameValue as string]: scale }
		if (this.stepNameValue) {
			result[this.stepNameValue as string] = scale.step
		}
		return result
	}

	protected handleRangeBind(
		args: CreateScaleArgs,
		rangeBind: Dimension,
	): [number, number] {
		if (rangeBind === Dimension.HEIGHT) {
			return [args.view.height, 0]
		} else {
			return [0, args.view.width]
		}
	}
}
