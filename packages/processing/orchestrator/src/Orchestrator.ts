// tslint:disable no-console
import {
	ChartOptions,
	SceneNode,
	DataFrame,
	VDomRenderer,
	ScenegraphConverter,
} from '@markable/interfaces'
import { parseScene } from '@markable/scenegraph'
import { VirtualSvgConverter } from '@markable/vsvg'
import { createScenegraph } from '@markable/scene'

export class Orchestrator<T> {
	constructor(
		private renderer: VDomRenderer<T>,
		private prerenderer: ScenegraphConverter<any> = new VirtualSvgConverter(),
	) {}

	/**
	 * Renders a raw scenegraph object into view. This is mostly useful for internal debugging
	 * @param rawScene The raw scenegraph object to render
	 * @param options Charting options
	 */
	public renderScenegraph(rawScene: any, options: ChartOptions = {}): T {
		try {
			const scenegraph = parseScene(rawScene)
			const intermediate = this.prerenderer.render(scenegraph, options)
			return this.renderer.render(intermediate, {})
		} catch (err) {
			console.log('error rendering scenegraph', err)
			throw err
		}
	}

	/**
	 * Binds data to a scene and renders it into view.
	 * @param scene The scene to rendre
	 * @param options The chart options
	 * @param tables The charting data
	 */
	public renderScene(
		scene: SceneNode,
		options: ChartOptions = {},
		tables: DataFrame,
	) {
		try {
			const sg = createScenegraph(scene, tables, options)
			const vdom = this.prerenderer.render(sg.root, options)
			return this.renderer.render(vdom, sg.channelHandlers)
		} catch (err) {
			console.log('error rendering scene', err)
			throw err
		}
	}
}
