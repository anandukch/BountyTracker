import Employee from "../entity/employee.entity";
import RedeemRequest from "../entity/RedeemRequest";
import HttpException from "../exceptions/http.exceptions";
import RedeemRequestRepository from "../repository/redeemRequest.repository";
import RedeemRequestEnum from "../utils/redeemRequest.enum";

class RedeemRequestService {
	constructor(private repository: RedeemRequestRepository) {}

	getRedeemRequest = async () => {
		const redeemRequest = await this.repository.find(
			{
				status: RedeemRequestEnum.REQUESTED,
			},
			["employee"]
		);

		return redeemRequest;
	};

	sendRedeemRequest = async (employee: Employee, amount: number) => {
		const newRedeemRequest = new RedeemRequest();
		newRedeemRequest.employee = employee;
		newRedeemRequest.redeemAmount = amount;
		newRedeemRequest.status = RedeemRequestEnum.REQUESTED;
		newRedeemRequest.content = `Redeem Request by : #${employee.id} : ${employee.name} `;
		return this.repository.save(newRedeemRequest);
	};

	approveRedeemRequest = async (id: number) => {
		const redeemRequest = await this.repository.findOneBy({ id });
		if (!redeemRequest) {
			throw new HttpException(404, "Redeem Request not found");
		}
		redeemRequest.status = RedeemRequestEnum.APPROVED;
		return this.repository.save(redeemRequest);
	};

	getUserRedeemRequest = async (employeeId: number) => {
		const redeemRequest = await this.repository.find(
			{
				employee: { id: employeeId },
				status: RedeemRequestEnum.REQUESTED,
			},
			["employee"]
		);

		return redeemRequest;
	};
}

export default RedeemRequestService;
