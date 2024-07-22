const getValidationErrorConstraints = (validationErrors) => {
	const validationErrorConstraints = [];
	validationErrors.map((validationError) => {
		// validationErrorConstraints.push()
		Object.values(validationError.constraints).forEach((constraint) => {
			validationErrorConstraints.push(constraint);
		});
	});
	return validationErrorConstraints;
};

export default getValidationErrorConstraints;
