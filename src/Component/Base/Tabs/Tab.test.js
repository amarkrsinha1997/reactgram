import React from 'react';
import { render } from '@testing-library/react';
import { Tab } from './Tab';

test('renders learn react link', () => {
    const { container } = render(<Tab />);
    expect(container).toMatchSnapshot();
});
