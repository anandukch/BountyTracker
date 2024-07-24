import React, { useState } from "react";
import "./ReviewPage.styles.scss";
import ParticipantContribution from "../../components/ParticipantContribution/ParticipantContribution";
const ReviewPage = () => {
	const [participantList, setParticipantList] = useState([
		{
			name: "Alnas",
			contributions: [{ content: "SOmething" }, { content: "SOmething" }, { content: "SOmething" }],
		},
		{
			name: "Alnas",
			contributions: [{}, {}, {}],
		},
	]);

	const [expandedIndex, setExpandedIndex] = useState(-1);

	const handleExpand = (index) => setExpandedIndex((prev) => (prev !== index ? index : -1));
	return (
		<div className="ReviewPage">
			{/* {isLoading && <Loader />} */}
			<div className="wrapHeading">
				<h1>Review Task</h1>
			</div>

			<main className="reviewMain">
				<section className="taskDetails">
					<span className="taskDetailsHeader">
						<h2 className="taskTitle">{"Task: ${taskName}"}</h2>
						<h2 className="taskId">{"Task #taskId"}</h2>
					</span>
					<h3>{"{Task Desciption}"}</h3>
				</section>
				<section className="contributionSection">
					<div className="contributionHeading">
						<h3>Participant Contributions</h3>
						<span>Remaining Bounty: 200 KoYns</span>
					</div>
					{participantList.map((participant, index) => (
						<ParticipantContribution
							key={participant.id}
							participant={participant}
							isExpanded={index === expandedIndex}
							onClick={() => handleExpand(index)}
						/>
					))}
				</section>
			</main>
		</div>
	);
};

export default ReviewPage;
