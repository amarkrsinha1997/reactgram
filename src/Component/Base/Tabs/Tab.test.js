import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

test('renders learn react link', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
});
