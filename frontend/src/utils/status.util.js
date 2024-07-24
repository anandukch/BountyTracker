export const setStatus = (startDate, deadLine, status) => {
	if (status == "In progress" || status == "In review") return status;
	else if (status == "completed") return "Completed";
	const currentDate = new Date();
	const date = currentDate.toISOString();
	if (date < startDate) status = "Yet to start";
	else if (date > startDate && date < deadLine) status = "In Progress";
	return status;
};
