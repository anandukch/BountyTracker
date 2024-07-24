import React, { useState } from "react";

import downArrow from "../../assets/downArrow.svg";
import TextField from "../../components/TextField/TextField";

const ParticipantContribution = ({ participant }) => {
	const [rewardBounty, setRewardBounty] = useState(0);
	return (
		<div className="contribution">
			<div className="contributedParticipant">
				<span className="participantName">{participant.name}</span>
				<span className="contributionCount">{`${participant.contributions.length} Contributions`}</span>
				<span className="imgContainer">
					<img src={downArrow} />
				</span>
			</div>
			<div className="rewardWrapper">
				<TextField label="Bounty Reward:" value={rewardBounty} onChange={() => {}} />
				<span>Koyns</span>
			</div>
		</div>
	);
};

export default ParticipantContribution;
