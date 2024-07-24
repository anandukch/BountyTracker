import { v4 } from "uuid";
import { addToastMessage } from "../store/toastReducer";

export const createToastError = (dispatch, message) => {
	dispatch(
		addToastMessage({
			id: v4(),
			status: "error",
			message: message,
		}),
	);
};
