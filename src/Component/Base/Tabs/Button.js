import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
	return (
		<button className="tab" onClick={props.onClick}>
			{props.children}
		</button>
	)
}

Button.propTypes = {
	onClick: PropTypes.func
}
Button.defaultProps = {
	onClick: () => {}
}
export { Button }

