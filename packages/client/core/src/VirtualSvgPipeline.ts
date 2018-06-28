import {
	VDomRenderer,
	ChartOptions,
	SceneNode,
	DataFrame,
} from '@gog/interfaces'
import { parseScene } from '@gog/scenegraph'
import { VirtualSvgConverter } from '@gog/xform-vsvg'
import { Scene } from '@gog/scenegen'

const converter = new VirtualSvgConverter()

export class VirtualSvgPipeline<T> {
	constructor(private renderer: VDomRenderer<T>) {}

	public handleScenegraph(rawScene: any, options: ChartOptions = {}): T {
		const scenegraph = parseScene(rawScene)
		const vdom = converter.render(scenegraph, options)
		return this.renderer.render(vdom, {})
	}

	public handleData(
		scene: SceneNode,
		options: ChartOptions = {},
		tables: DataFrame,
	) {
		const sg = new Scene(scene, options).build(tables)
		const vdom = converter.render(sg.root, options)
		return this.renderer.render(vdom, sg.channelHandlers)
	}
}
