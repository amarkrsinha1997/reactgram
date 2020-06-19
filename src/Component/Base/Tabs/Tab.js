import React from 'react';
import { colors } from '../../../styles/colors';

const style =  `
	.tab {
		background: ${colors.grey.shade1};
		padding: 5px 10px;
		color: ${colors.black.shade1};
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

