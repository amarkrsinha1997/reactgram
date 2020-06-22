import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders learn react link', () => {
	const { container } = render(<Button />);
	expect(container).toMatchSnapshot();
});
test('should call onClick handler', () => {
	const onClick = jest.fn();
	const { getByText} = render(<Button onClick={onClick}> Lie </Button>)
	fireEvent.click(getByText(/Lie/))
	expect(onClick).toHaveBeenCalledTimes(1)
})
