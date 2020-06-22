import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './Image.css'

const imageBaseUrl = "https://raw.githubusercontent.com/pankajladhar/Reactgram/master/app/images";

export const Image = ({ imageName, alt, ...others }) => {
	const url = `${imageBaseUrl}/${imageName}`
	return (
		<Fragment>
			<img className="image" data-testid={imageName} src={url} alt={alt} {...others} />
		</Fragment>
	)
}

Image.propTypes = {
	imageName: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired
}