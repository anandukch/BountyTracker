import React, { useEffect, useState } from "react";
import "./ReviewPage.styles.scss";
import ParticipantContribution from "../../components/ParticipantContribution/ParticipantContribution";
import { useGetTaskContributionsQuery } from "../../api/taskApi";
import { useParams } from "react-router-dom";
import CustomModal from "../../components/Modal/CustomModal";

const ReviewPage = () => {
	const [participantList, setParticipantList] = useState([]);

	const [expandedIndex, setExpandedIndex] = useState(-1);
	const [showContributionModal, setShowContributionModal] = useState();

	const { taskId } = useParams();

	const handleExpand = (index) => setExpandedIndex((prev) => (prev !== index ? index : -1));

	const { data: contributionData, isSuccess } = useGetTaskContributionsQuery(parseInt(taskId));

	useEffect(() => {
		if (isSuccess) {
			console.log(contributionData);
			const participantListReceived = contributionData.data.participants;
			setParticipantList(participantListReceived);
		}
	}, [contributionData, isSuccess]);

	const handleContributionModal = (contributionData) => {
		setShowContributionModal(contributionData);
	};

	return (
		<div className="ReviewPage">
			{showContributionModal && (
				<CustomModal
					handleCancel={() => setShowContributionModal(false)}
					hideButtons={true}
					title="Contribution Info"
				>
					<span>{showContributionModal.content}</span>
					<span>
						Attachment: {showContributionModal.fileUrl ? showContributionModal.fileUrl : "No Attachment"}
					</span>
				</CustomModal>
			)}
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
					{isSuccess &&
						participantList.map((participant, index) => (
							<ParticipantContribution
								key={participant.id}
								participant={participant}
								isExpanded={index === expandedIndex}
								onClick={() => handleExpand(index)}
								handleContributionModal={handleContributionModal}
							/>
						))}
				</section>
			</main>
		</div>
	);
};

export default ReviewPage;
