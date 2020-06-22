import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';
import { Tab } from './Tab';
describe('Tabs', () => {

	test('renders Tabs properly', () => {
		const wrapper = <Tabs>
			<Tab>
				Like 1
			</Tab>
			<Tab>
				Comment 1
			</Tab>
		</Tabs>
		const { container } = render(wrapper);
		expect(container).toMatchSnapshot();
	});

	test('renders not render unwanted child', () => {
		const wrapper = <Tabs>
			<Tab>
				Like 1
            </Tab>
			<div data-testid="unwanted">
				Comment 1
            </div>
		</Tabs>
		const { container } = render(wrapper);
		const result = screen.queryByText(/comment 1/);
		expect(result).toBeFalsy();
		expect(container).toMatchSnapshot();
	});
});
