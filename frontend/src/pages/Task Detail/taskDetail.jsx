/* eslint-disable react/jsx-key */
import "./styles.scss";
import logo from "../../assets/KoYns-Logo.png";
import commentIcon from "../../assets/commentIcon.svg";
import attach from "../../assets/attach.svg";
import profile from "../../assets/profile.png";
import send from "../../assets/send.svg";
import Button from "../../components/Button/Button";
import { useEffect, useRef, useState } from "react";
import {
	useCreateCommentMutation,
	useGetCommentsByTaskIdQuery,
	useJoinTaskMutation,
	useLazyGetCommentsByTaskIdQuery,
	useLazyGetTaskByIdQuery,
} from "../../api/taskApi";
import { formatDate } from "../../utils/date.utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addJoinedStatus } from "../../store/employeeReducer";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import ContributionCommentComponent from "../../components/ContributionCommentComponent/ContributionCommentComponent";
const TaskDetail = () => {
	const user = useSelector((state) => state.employee.employee);
	const [commentList, setCommentList] = useState([]);
	const [participantList, setParticipantList] = useState([]);
	const [joined, setJoined] = useState(false);
	const [file, uploadFile] = useState();
	const [comment, setComment] = useState("");
	const [commentType, setCommentType] = useState("Normal");
	const [mentionId, setMentionId] = useState();
	const [isCreator, setIsCreator] = useState(false);

	//------------queries--------
	// const { data: taskDetail, isSuccess: taskSuccess } = useGetTaskByIdQuery(taskId);

	const { taskId } = useParams();
	const inputRef = useRef();
	const checkboxRef = useRef();
	const dispatch = useDispatch();

	const [getTaskById, { data: taskDetail, isSuccess: taskSuccess }] = useLazyGetTaskByIdQuery();
	const { data: commentsData, isSuccess: commentSuccess } = useGetCommentsByTaskIdQuery(taskId, {
		pollingInterval: 2000,
		skipPollingIfUnfocused: true,
	});

	// const [getCommentByTaskId, { data: commentsData, isSuccess: commentSuccess }] = useLazyGetCommentsByTaskIdQuery();
	const [join, { isSuccess: joinSuccess }] = useJoinTaskMutation();
	const [createComment] = useCreateCommentMutation();

	const navigate = useNavigate();

	const form_fields = [
		{
			id: "description",
			name: "Description",
			value: taskDetail?.description,
		},

		{
			id: "skills",
			name: "Skills",
			value: taskDetail?.skillList,
		},
	];

	// useEffect(() => {
	// 	getCommentByTaskId(taskId);
	// 	const timer = setInterval(() => {
	// 		// setShowError(false);
	// 		getCommentByTaskId(taskId);
	// 	}, 2000);

	// 	return () => clearInterval(timer);
	// }, [getCommentByTaskId, taskId]);

	const handleSend = async () => {
		const formData = new FormData();
		if (file) formData.append("file", file);
		formData.append("commentType", commentType);
		formData.append("content", comment);
		if (mentionId) formData.append("mentionCommentId", mentionId);
		createComment({ taskId, formData });
		setComment("");
		setCommentType("Normal");
		setMentionId(undefined);
		checkboxRef.current.checked = false;
	};

	// const handleSubmitReview = async () => {
	// 	const formData = new FormData();
	// 	formData.append("file", file);
	// 	formData.append("commentType", "Review");
	// 	formData.append("content", contribution);
	// 	createComment({ taskId, formData });
	// 	setContribution("");
	// };
	const handleReview = () => {
		setCommentType((prev) => {
			if (prev == "Normal") return "Review";
			return "Normal";
		});
	};
	const handleTextArea = (e) => {
		setComment(e.target.value);
	};
	const handleUpload = (e) => {
		// .log("file");
		uploadFile(e.target.files[0]);
	};
	const handleReply = (id) => {
		inputRef.current.focus();
		setMentionId(id);
	};
	const handleJoin = () => {
		join(taskId);
	};

	const completeTask = () => {
		navigate(`/tasks/${taskId}/review`);
		// completeTaskRequest(Number(taskId));
	};

	const setColor = (status) => {
		if (status == "In Progress") return "#efecda";
		else if (status == "In Review") return "#f5ecb8";
		else return "#d3f4be";
	};

	useEffect(() => {
		if (taskSuccess) {
			const participants = taskDetail.data.participants;
			setParticipantList(participants);
			if (taskDetail.data.createdBy.email === user.email) {
				setJoined(true);
				setIsCreator(true);
			} else {
				participants.forEach((participant) => {
					if (participant.email === user.email) {
						// dispatch(addJoinedStatus({ id: taskId, status: "joined" }));
						setJoined(true);
					}
				});
			}
		}
	}, [taskSuccess, taskDetail, user]);

	useEffect(() => {
		getTaskById(taskId);
		if (joinSuccess) {
			dispatch(addJoinedStatus({ status: "joined" }));
			setJoined(true);
		}
	}, [joinSuccess, dispatch, getTaskById, taskId]);

	useEffect(() => {
		if (commentSuccess) {
			setCommentList(commentsData.data);
		}
	}, [commentsData, commentSuccess]);

	return (
		<main className="taskDetail">
			{/* {showContributionModal && (
				<CustomModal
					title="Add Contribution"
					submitText="Contribute"
					handleCancel={() => {
						setShowContributionModal(false);
						setContribution("");
					}}
					handleSubmit={handleSubmitReview}
					// handleSubmit={}
				>
					<textarea
						className="contributionTextArea"
						placeholder="Enter contribution details..."
						value={contribution}
						onChange={(e) => setContribution(e.target.value)}
					></textarea>
					<div className="contributionFileUpload">
						{file ? file.name : "Choose a file to upload..."}
						<div className="contributionFileUploadButton">
							<label htmlFor="file" className="uploadFileLabel">
								<input type="file" id="file" className="uploadFile" onChange={handleUpload} />
								<img src={attach} alt="Add attachment" />
							</label>
						</div>
					</div>
				</CustomModal>
			)} */}
			<div className="title">
				<span>
					<h3>Task : # {taskDetail?.data.title}</h3>
					<p className="statusPill" style={{ backgroundColor: `${setColor(taskDetail?.data.status)}` }}>
						{taskDetail?.data.status}
					</p>
				</span>
				<span>
					<h3>Due : {formatDate(taskDetail?.data.deadLine)}</h3>
				</span>
				<span>
					{taskDetail &&
						// formatDate(new Date()) < formatDate(taskDetail?.data.deadLine) &&
						taskDetail.data.status != "Completed" &&
						isCreator && <Button text="Review Task" isPrimary={true} onClick={completeTask} />}
				</span>
			</div>
			<div className="data">
				<div className="details">
					<div className="detailSectionData">
						{form_fields.map((fields) => {
							return (
								<div className="fields">
									<label> {fields.name}</label>
									<div className={fields.id}>{taskDetail?.data[fields.id]}</div>
								</div>
							);
						})}
						<div className="typeSection">
							<div className="fields">
								<label> Type</label>
								<div className="type">
									{taskDetail?.data.maxParticipants > 1 ? "Group" : "Individual"}
								</div>
							</div>

							<div className="fields">
								<label> Max Participants</label>
								<div className="maxParticipants">{taskDetail?.data.maxParticipants}</div>
							</div>
						</div>
					</div>
					<div className="dataBottom">
						<div className="detailSectionBounty">
							<h3>Reward</h3> <img src={logo} alt="KoYns logo" />
							<div className="bountyPoints">{taskDetail?.data.totalBounty} KYNs</div>
							<div className="assignedBy">
								<h4>Assigned By : {taskDetail?.data.createdBy.name}</h4>
							</div>
						</div>
						<div className="particpantsListSection">
							<div className="particpantsListHeader">Particpants</div>
							<div className="particpantsList">
								{participantList.map((participant) => {
									return (
										<div className="partcipants" key={participant.id}>
											<img src={profile} alt="profile icon" />
											{participant.name}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				{/* {joined ? ( */}
				<div className="bottomSectionWrapper">
					{!joined && (
						<div className="joinButtonWrapper">
							<Button text="Join Task" isPrimary={true} onClick={handleJoin} />
						</div>
					)}
					<div className={`bottomSection ${!joined ? "beforeJoining" : ""}`}>
						<div className="commentSection">
							<div className="commentSectionHeader">
								<span>Comments</span>
							</div>

							<div className="commentSectionWrapper">
								<div className="commentListWrapper">
									<div className="commentList">
										{commentList?.map((comment) => {
											return comment.commentType === "Normal" ? (
												<CommentComponent
													comment={comment}
													handleReplyClick={handleReply}
													currentEmployeeEmail={user.email}
												/>
											) : (
												<ContributionCommentComponent
													comment={comment}
													handleReplyClick={handleReply}
												/>
											);
										})}
									</div>
								</div>
								<div className={`addComment ${commentType === "Review" ? "reviewTextBox" : ""}`}>
									<img src={commentIcon} alt="Comment Icon" />
									{mentionId && (
										<div className="mentionShowWrapper">
											<span className="mentionShow">{`Replying to ${mentionId}`}</span>
											<span className="removeMention" onClick={() => setMentionId(undefined)}>
												x
											</span>
										</div>
									)}
									<textarea
										ref={inputRef}
										className="commentBox"
										placeholder="//add comments"
										rows="1"
										onChange={handleTextArea}
										value={comment}
									/>
									{file && (
										<div className="mentionShowWrapper">
											<span className="mentionShow">{`${file.name.toString().slice(0, 10)} attached`}</span>
											<span className="removeMention" onClick={() => uploadFile(undefined)}>
												x
											</span>
										</div>
									)}
									<span className="commentButtons">
										<button className="contributionFileUploadButton">
											<label htmlFor="file" className="uploadFileLabel">
												<input
													type="file"
													id="file"
													className="uploadFile"
													onChange={handleUpload}
												/>
												<img src={attach} alt="Add attachment" />
											</label>
										</button>
										<button className="sendButton">
											<img src={send} alt="Send Comment" onClick={handleSend} />
										</button>
									</span>
								</div>
								{!isCreator ? (
									<div className="reviewCheckBox">
										<label htmlFor="Review">Mark As Contribution</label>
										<input
											type="checkbox"
											ref={checkboxRef}
											name="Review"
											onChange={handleReview}
											checked={commentType === "Review"}
										/>
									</div>
								) : (
									""
								)}
							</div>
						</div>
						{/* <div className="reviewSection">
						<div className="reviewSectionHeader">
							<span>Contributions</span>
							<Button
								type="button"
								className="addContributionButton"
								text="Add Contributions"
								isPrimary={true}
								onClick={() => setShowContributionModal(true)}
							/>
						</div>
						<div className="reviewWrapper">
							<div className="reviewList">
								{commentList?.reviewComments?.map((contribution) => {
									return <CommentComponent key={contribution.id} comment={contribution} />;
								})}
							</div>
						</div>
					</div> */}
					</div>
				</div>
			</div>
			{/* ) : (
				<div className="Join Button" onClick={handleJoin}>
					Join
				</div>
			)} */}
		</main>
	);
};
export default TaskDetail;
