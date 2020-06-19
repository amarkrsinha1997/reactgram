import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from './Image';

test('renders with required props', () => {
    const { container } = render(<Image alt="image" imageName="image.jpg"/>);
    expect(container).toMatchSnapshot();
});

test('renders with extra props passed like height, width', () => {
    const { container } = render(<Image alt="image" imageName="image.jpg" height="20px" width="20px"/>);
    const imgElement = screen.getByTestId(/image.jpg/);
    expect(imgElement).toHaveAttribute('height', '20px')
    expect(imgElement).toHaveAttribute('width', '20px')
    expect(container).toMatchSnapshot();
});
