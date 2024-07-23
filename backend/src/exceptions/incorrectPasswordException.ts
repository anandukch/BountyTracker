import HttpException from "./http.exceptions";

class IncorrectPasswordException extends HttpException {
	constructor(message: string) {
		super(403, message);
	}
}
export default IncorrectPasswordException;
