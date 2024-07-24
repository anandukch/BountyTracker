/* eslint-disable react/prop-types */
import Button from "../Button/Button";
import "./style.scss";
import close from "../../assets/close.svg";

const CustomModal = ({ children, title, submitText, handleCancel, handleSubmit, hideButtons }) => {
	const handleCancelBackground = (e) => {
		e.currentTarget === e.target ? handleCancel() : "";
	};
	return (
		<div className="CustomModalBackground" onClick={handleCancelBackground}>
			<div className={`CustomModal ${hideButtons ? "shrink" : ""}`}>
				<img src={close} onClick={handleCancel} />
				<header>{title}</header>
				{children}
				<main>
					{!hideButtons && (
						<span className="modalButtons">
							<Button text={submitText} onClick={() => handleSubmit()} isPrimary={true} />
							<Button text="Cancel" onClick={handleCancel} className="cancel" />
						</span>
					)}
				</main>
			</div>
		</div>
	);
};

export default CustomModal;
