import React from 'react'
import PropTypes from 'prop-types'

const imageBaseUrl = "https://raw.githubusercontent.com/pankajladhar/Reactgram/master/app/images";


export const Image = ({imageName, alt, ...others}) => {
    const url = `${imageBaseUrl}/${imageName}`
    return <img data-testid={imageName} src={url} alt={alt} {...others}/>
}
Image.propTypes = {
    imageName: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}