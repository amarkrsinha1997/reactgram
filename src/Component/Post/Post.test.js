import React from "react";
import { Post } from './Post';
import { render  } from "@testing-library/react";

describe('Post', () => {
	let props;
	beforeEach(() => {
		props = {
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
		};
	})
	test('should render properly', () => {
		const { container } = render(<Post {...props}/>);
		expect(container).toMatchSnapshot();
	});
	test('should show number comments in a post', () => {
		const { queryByText } = render(<Post {...props} />);
		queryByText(/(1)/)
		expect(queryByText(/(1)/)).not.toBeNull();
	})
	test('should not show number comments in a post when no comments are there.', () => {
		const { queryByText } = render(<Post {...props} comment={[]}/>);
		queryByText(/(1)/)
		expect(queryByText(/(1)/)).toBeNull();
	})
});