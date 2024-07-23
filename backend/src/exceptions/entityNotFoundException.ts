import HttpException from "./http.exceptions";

class EntityNotFoundException extends HttpException {
	constructor(message: string) {
		super(404, message);
	}
}
export default EntityNotFoundException;
