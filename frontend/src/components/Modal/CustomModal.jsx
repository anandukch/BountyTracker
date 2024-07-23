import Button from "../Button/Button";
import "./style.scss";

const CustomModal = ({ children, title, submitText, handleCancel, handleSubmit }) => {
	const handleCancelBackground = (e) => {
		e.currentTarget === e.target ? handleCancel() : "";
	};
	return (
		<div className="CustomModalBackground" onClick={handleCancelBackground}>
			<div className="CustomModal">
				<header>{title}</header>
				{children}
				<main>
					<span className="modalButtons">
						<Button text={submitText} onClick={() => handleSubmit()} isPrimary={true} />
						<Button text="Cancel" onClick={handleCancel} className="cancel" />
					</span>
				</main>
			</div>
		</div>
	);
};

export default CustomModal;
