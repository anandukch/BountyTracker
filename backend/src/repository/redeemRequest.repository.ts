import { Repository } from "typeorm";
import RedeemRequest from "../entity/RedeemRequest";
import BaseRepository from "./base.repository";

class RedeemRequestRepository extends BaseRepository<RedeemRequest> {
	constructor(repository: Repository<RedeemRequest>) {
		super(repository);
	}
}

export default RedeemRequestRepository;
