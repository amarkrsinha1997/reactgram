import React, { useMemo } from 'react'
import { Tab } from './Tab';

const style = `
    .tabs {
			display: flex;
			justify-content: space-between;
		}
`;

function Tabs(props) {
	const children = useMemo(() => {
		const result = []
		React.Children.forEach(props.children, child => {
			const type = child && child.type && (child.type.displayName || child.type.name);
			if ((Tab.displayName || Tab.name).includes(type)) {
				result.push(child)
			}
		})
		return result
	}, [props.children])

	return (
		<div className="tabs">
			{
				children
			}
			<style>{style}</style>
		</div>
	)
}

export { Tabs }

