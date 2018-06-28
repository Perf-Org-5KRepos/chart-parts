import { MarkType } from '@gog/interfaces'
import { SGMark, SGRectItem } from '@gog/interfaces'
import { VSvgNode } from '@gog/interfaces'
import { getItemSpace } from '@gog/util'
import { commonProps, assertTypeIs, emitMarkGroup } from './util'
import { rectangle } from '../path'
import { VSvgMarkConverter } from './interfaces'

export class RectRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Rect

	public render(mark: SGMark<SGRectItem>) {
		assertTypeIs(mark, RectRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Rect,
			mark.role,
			mark.items.map(item => {
				const space = getItemSpace(item)
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: rectangle(
							{ ...item, ...space.shape },
							space.origin.x,
							space.origin.y,
						).toString(),
					},
					metadata: item.metadata,
					channels: item.channels,
				}
				return result
			}),
		)
		return { nodes }
	}
}
