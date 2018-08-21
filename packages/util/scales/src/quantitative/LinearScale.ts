import { scaleLinear } from 'd3-scale'
import { CreateScaleArgs, Scales } from '@markable/interfaces'
import { QuantitativeScale, QuantitativeValue } from './QuantitativeScale'

export class LinearScale extends QuantitativeScale<QuantitativeValue, number> {
	protected defaultZero = true

	protected createScale(args: CreateScaleArgs): Scales {
		const domain = this.getDomain(args)
		const range = this.getRange(args)

		const scale = scaleLinear()
			.domain(domain)
			.range(range)
		this.addCommonProperties(scale)

		return {
			[this.nameValue as string]: scale,
		}
	}
}
