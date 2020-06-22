import React, { useMemo } from 'react'
import { Tab } from './Tab';
import './Tabs.scss'

function Tabs(props) {
	const children = useMemo(() => {
		const result = []
		React.Children.forEach(props.children, child => {
			const type = child && child.type && (child.type.displayName || child.type.name);
			if ((Tab.displayName || Tab.name).includes(type)) {
        result.push(<div className="seperator">{child}</div>)
			}
		})
		return result
	}, [props.children])

	return (
		<div className="tabs">
			{children}
		</div>
	)
}
Tabs.Tab = Tab;
export { Tabs }

