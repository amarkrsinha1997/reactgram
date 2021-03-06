import React from 'react'
import { Button } from '../Button/Button';
import './Tabs.scss'

function Tabs(props) {
	const result = []
	React.Children.forEach(props.children, (child, i) => {
		const type = child && child.type && (child.type.displayName || child.type.name);
		if ((Button.displayName || Button.name).includes(type)) {
					result.push(<div className="seperator" key={i}>{child}</div>)
		}
	})

	return (
		<div className="tabs">
			{result}
		</div>
	)
}
Tabs.Button = Button;
export { Tabs }

