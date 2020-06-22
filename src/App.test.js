import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
describe('App', () => {
	test('renders learn react link', () => {
		const { container } = render(<App />);
		expect(container).toMatchSnapshot();
	});
	test('should be able to see comment on the post when clicked on comment tab', () => {
		const { queryByTestId, queryByText } = render(<App />);
		const commentElements = queryByTestId(/_A2r0aQcfD/)
		expect(commentElements).toBeNull()
	
		const commentTabElement = queryByText(/Comments/)
		fireEvent.click(commentTabElement)
	
		expect(queryByTestId(/_A2r0aQcfD/)).toBeInTheDocument()
	})
	test.todo('should be able to like the post')
	test.todo('should be able to comment on the post')
});