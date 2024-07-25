/* eslint-disable react/prop-types */
import React, { useState } from "react";

import downArrow from "../../assets/downArrow.svg";
import diamond from "../../assets/diamond.svg";
import TextField from "../../components/TextField/TextField";

const ParticipantContribution = ({
	participant,
	isExpanded,
	onClick,
	handleContributionModal,
	remainingBounty,
	handleChangeBounty,
}) => {
	// const [rewardBounty, setRewardBounty] = useState(0);
	const contributionList = participant.contributions;
	// const handleChangeBounty = (e) => {
	// 	// if (e.target.value === "") setRewardBounty(0);
	// 	// const bounty = parseInt(e.target.value);
	// 	// if (bounty) setRewardBounty(bounty);
	// };
	return (
		<div className="contributionWrapper">
			<div className="contribution">
				<div className="contributedParticipant" onClick={onClick}>
					<span className="participantName">{participant.name}</span>
					<span className="contributionCount">{`${contributionList.length} Contributions`}</span>
					<span className="imgContainer">
						<img src={downArrow} />
					</span>
				</div>
				{isExpanded && (
					<div className="contributionList">
						{contributionList.map((contribution) => (
							<div key={participant.id + contribution.id} className="contributionListElement">
								<span
									className="contributionListElementBody"
									onClick={() => handleContributionModal(contribution)}
								>
									<img src={diamond} />
									<span className="contributionListElementContent">{contribution.content}</span>
								</span>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="rewardWrapper">
				<TextField label="" value={participant.rewardedBounty} onChange={handleChangeBounty} />
				<span>Koyns</span>
			</div>
		</div>
	);
};

export default ParticipantContribution;
