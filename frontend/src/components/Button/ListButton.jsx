const ListButton = ({ text, buttonClass, clickHandle }) => {
	return (
		<button type="button" className={buttonClass} onClick={clickHandle}>
			{text}
		</button>
	);
};

export default ListButton;
