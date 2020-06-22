import React, { useMemo } from 'react'
import { Button } from '../Button/Button';
import './Tabs.scss'

function Tabs(props) {
	const children = useMemo(() => {
		const result = []
		React.Children.forEach(props.children, (child, i) => {
			const type = child && child.type && (child.type.displayName || child.type.name);
			if ((Button.displayName || Button.name).includes(type)) {
        		result.push(<div className="seperator" key={i}>{child}</div>)
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
Tabs.Button = Button;
export { Tabs }

