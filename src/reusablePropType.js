import PropTypes from 'prop-types';

export const commentPropTypes = PropTypes.shape({
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
})