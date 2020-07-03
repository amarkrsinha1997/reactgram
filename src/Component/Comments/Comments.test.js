import React from "react";
import { render, fireEvent, waitForElementToBeRemoved,  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comments from "./Comments";
import { actionTypes } from "../../reducer";
describe('Comments', () => {
	let props;
	beforeEach(() => {
		props = {
			dispatch: jest.fn(),
			comments: [{id: 1,  user: 'Amar', text: 'nice dp!' }, {id: 2, user: 'Depak', text: 'Cool!'}],
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
		const wrapper = render(<Comments {...props} comments={[{ user: 'Amar', text: 'nice dp!' }]} />);
		fireEvent.click(wrapper.getByAltText(/edit-icon/));
		expect(wrapper.getByDisplayValue(/nice dp!/)).toBeInTheDocument();
	})
	test('should hide input box when edit button was clicked twice', () => {
		const wrapper = render(<Comments {...props} comments={[{ user: 'Amar', text: 'nice dp!' }]} />);
		fireEvent.click(wrapper.getByAltText(/edit-icon/));
		fireEvent.click(wrapper.getByAltText(/cancel-edit-icon/));
		expect(wrapper.queryByDisplayValue(/nice dp!/)).not.toBeInTheDocument();
	});

	test('should be able to change input value', async () => {
		const wrapper = render(<Comments {...props} comments={[{ user: 'Amar', text: 'nice dp!' }]} />);
		fireEvent.click(wrapper.getByAltText(/edit-icon/));
		userEvent.type(wrapper.getByTestId(/edit-input/), 'Hello');
		fireEvent.keyDown(wrapper.getByTestId(/edit-input/), { key: 'Enter' });
		
		await waitForElementToBeRemoved(() => wrapper.getByTestId(/edit-input/));

		expect(wrapper.queryByTestId(/edit-input/)).not.toBeInTheDocument();
		expect(props.dispatch).toHaveBeenCalledWith({
			type: actionTypes.EDIT_COMMENT,
			payload: { postId: props.postId, commentId: props.id, comment: 'Hello' }
		})
	})
	test('should focus on input when edit-icon clicked', () => {
		const wrapper = render(<Comments {...props} comments={[{ user: 'Amar', text: 'nice dp!' }]} />);
		fireEvent.click(wrapper.getByAltText(/edit-icon/));
		expect(wrapper.getByTestId(/edit-input/)).toHaveFocus();
	})
});