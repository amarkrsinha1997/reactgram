import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./data/posts', () => {
  return [	{
		"code": "_A2r0aQcfD",
		"caption": "Some serious hardware meet JavaScript hacks going down this week at hackeryou. Excited for demo day!",
		"likes": 57,
		"id": "1135147611821557699",
		"display_src": "12276809_750065668431999_184252508_n.jpg",
		"comment": [
			{
				"text": "Uhu!",
				"user": "lucascaixeta",
				"id": 1
			}
		]
	}]
})

test('renders learn react link', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
