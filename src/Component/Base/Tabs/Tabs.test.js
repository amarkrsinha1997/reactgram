import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';

describe('Tabs', () => {
	test('renders Tabs properly', () => {
		const wrapper = <Tabs>
			<Tabs.Button>
				Like 1
			</Tabs.Button>
			<Tabs.Button>
				Comment 1
			</Tabs.Button>
		</Tabs>
		const { container } = render(wrapper);
		expect(container).toMatchSnapshot();
	});

	test('renders not render unwanted child', () => {
		const wrapper = <Tabs>
			<Tabs.Button>
				Like 1
      </Tabs.Button>
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
