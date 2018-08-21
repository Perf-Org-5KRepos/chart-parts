// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@markable/scenegraph'
const data = require('../resources/horizon_graph.json')

export const scenegraph = parseScene(data)
export const title = 'Horizon Graph'
export const dimensions = {
	height: 150,
	width: 520,
	origin: [30, 19] as [number, number],
}
