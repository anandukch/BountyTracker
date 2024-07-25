const getTokenPayload = () => {
	const token = localStorage.getItem("token");
	const arrayToken = token.split(".");
	const tokenPayload = JSON.parse(atob(arrayToken[1]));
	return tokenPayload;
};

export default getTokenPayload;
