import React from 'react';
import { colors } from '../../../styles/colors';

const style =  `
.tab {
	background: ${colors.grey.shade1};
	padding: 10px 20px;
	color: ${colors.black.shade1};
	text-align: center;
}
`
const Tab = (props) => {
	return (
		<div className="tab">
			{props.children}
			<style>{style}</style>
		</div>
	)
}

export { Tab }

