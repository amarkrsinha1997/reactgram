import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../styles/colors';

const style =  `
.tab {
	background: ${colors.grey.shade1};
	padding: 10px 20px;
	color: ${colors.black.shade1};
	text-align: center;
}
`
const Button = (props) => {
	return (
		<div className="tab" role="button" onClick={props.onClick}>
			{props.children}
			<style>{style}</style>
		</div>
	)
}

Button.propTypes = {
	onClick: () => {}
}
export { Button }

