import platinumBadge from "../assets/platinumMedal.svg";
import goldBadge from "../assets/goldMedal.svg";
import silverBadge from "../assets/silverMedal.svg";
import bronzeBadge from "../assets/bronzeMedal.svg";

const tierBadge = (tier) => {
	if (tier == "Gold") return goldBadge;
	else if (tier == "Silver") return silverBadge;
	else if (tier == "Bronze") return bronzeBadge;
	else return platinumBadge;
};

const DetailBlock = ({ header, content }) => {
	if (header == "Tier") {
		const image = tierBadge(content);
		return (
			<div className="employeeDetailBlock">
				<h4>{header}</h4>
				<img className="tierBadge" src={image} />
			</div>
		);
	}
	return (
		<div className="employeeDetailBlock">
			<h4>{header}</h4>
			<p>{content}</p>
		</div>
	);
};
export default DetailBlock;
