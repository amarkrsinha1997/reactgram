import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Comments from "./Comments";

describe('Comments', () => {
	let props;
	beforeEach(() => {
		props = {
			dispatch: jest.fn(),
			comments: [{ user: 'Amar', text: 'nice dp!' }, {user: 'Depak', text: 'Cool!'}],
			postId: "1234",
			code: 'AXU_Y21A_T'
		}
	})
	test("should render properly", () => {
		const wrapper = render(<Comments {...props}/>);
		expect(wrapper.container).toMatchSnapshot()
		expect(wrapper.getAllByAltText(/edit-icon/)).toHaveLength(2);
	})
	test("should show cancel item on click of edit button", () => {
		const wrapper = render(<Comments {...props} comments={[{ user: 'Amar', text: 'nice dp!' }]}/>);
		fireEvent.click(wrapper.getByAltText(/edit-icon/));
		expect(wrapper.getByAltText(/cancel-edit-icon/)).toBeInTheDocument();
	});
	test("should show input box when edit button is clicked.", () => {

	})
	test('should hide input box when edit button was clicked twice', () => {
		
	});

});