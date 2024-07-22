import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../store/toastReducer";

const Toast = ({ status, message, id }) => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		setActive(true);
		setTimeout(() => {
			setActive(false);
			setTimeout(() => {
				dispatch(clearError(id));
			}, 500);

			// return () => clearTimeout(deleteTimer);
		}, 2000);

		// return () => clearTimeout(activeTimer);
	}, [dispatch, id]);

	return (
		<div
			className={
				"toast " + (active ? "toast-active " + (status == "error" ? "toast-error " : "toast-success ") : "")
				// (message ? "snackbar-active " : "")
			}
		>
			{message}
		</div>
	);
};

export default Toast;
