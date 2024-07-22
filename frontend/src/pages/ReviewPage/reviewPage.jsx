import Button from "../../components/Button/Button";
import "../../pages/ReviewPage/reviewPage.scss";
import profileImg from "../../assets/profile.png";
import { useState, useEffect } from "react";
import { useCreateCommentMutation, useGetCommentByIdQuery, useReviewCommentByIdMutation } from "../../api/taskApi";
import { useParams } from "react-router-dom";
// import comment from "../../utils/comment.util.json"

const ReviewPage = () => {
	const { id } = useParams();
	console.log(id);
	const { data: reviewComment = [], isSuccess: commentFetched } = useGetCommentByIdQuery(parseInt(id));
	const [reviewReplyComment] = useCreateCommentMutation();
	const [reviewReplyStatus] = useReviewCommentByIdMutation();

	useEffect(() => {
		console.log(reviewComment);
	}, [commentFetched]);

	const handleApprove = () => {
		reviewReplyComment({
			id: 6,
			commentType: "Normal",
			content: formData.comment,
			mentionCommentId: parseInt(id),
		});
		reviewReplyStatus({
			id: parseInt(id),
			reviewStatus: "ACCEPTED",
			reviewRewardBounty: Number(formData.bountyPoints) + Number(formData.specialBountyPoints),
		});
	};

	const handleReject = () => {};

	const [formData, setFormData] = useState({
		bountyPoints: 0,
		specialBountyPoints: 0,
		comment: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<div className="fullWrap">
			<div className="wrapHeading">
				<h1>Review</h1>
			</div>
			<div className="userSection">
				<div className="reviewName">
					<img src={profileImg} />
					<h3>{commentFetched ? reviewComment.data.employee.name : ""}</h3>
				</div>
				<div className="reviewDesciption">
					<div className="reviewTextDescription">
						<p>Desciption:</p>
						{commentFetched ? reviewComment.data.content : ""}
					</div>
					<p>File:</p>
					<div className="reviewFileDescription">
						<div className="previewTitle" id="file-name">
							Download File
						</div>
						<a
							href={commentFetched ? reviewComment.data.fileUrl : ""}
							download
							className="downloadLink"
							id="download-link"
						>
							Download ZIP
						</a>
					</div>
				</div>
			</div>
			<div className="leadSection">
				<div className="bountyPoints">
					<div className="awardBounty">
						<h3>KoYns</h3>
						<input
							type="number"
							id="bountyPoints"
							placeholder="kYns"
							name="bountyPoints"
							min="0"
							onChange={handleChange}
						></input>
					</div>
					<div className="awardSpecialBounty">
						<div className="textGroup">
							<h3>Special </h3>
							<h3>KoYns</h3>
						</div>
						<input
							type="number"
							id="specialBountyPoints"
							placeholder="kYns"
							name="specialBountyPoints"
							min="0"
							onChange={handleChange}
						></input>
					</div>
				</div>
				<div className="leadComment">
					<h3>Comments</h3>
					<textarea
						rows="4"
						cols="50"
						name="comment"
						form="usrform"
						placeholder="Enter Text Here..."
						onChange={handleChange}
					></textarea>
				</div>
				<div className="reviewButtons">
					<div className="approveButton">
						<Button text="Approve" className="approve" onClick={handleApprove} />
					</div>
					<div className="closeButton">
						<Button text="Close" className="close" onClick={handleReject} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default ReviewPage;
