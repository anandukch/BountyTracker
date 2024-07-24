import React, { useState } from "react";

import downArrow from "../../assets/downArrow.svg";
import diamond from "../../assets/diamond.svg";
import TextField from "../../components/TextField/TextField";

const ParticipantContribution = ({ participant, isExpanded, onClick }) => {
	const [rewardBounty, setRewardBounty] = useState(0);
	const contributionList = participant.contributions;
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
								<span className="contributionListElementBody">
									<img src={diamond} />
									<span className="contributionListElementContent">{contribution.content}</span>
								</span>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="rewardWrapper">
				<TextField label="Bounty Reward:" value={rewardBounty} onChange={() => {}} />
				<span>Koyns</span>
			</div>
		</div>
	);
};

export default ParticipantContribution;
