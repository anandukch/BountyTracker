/* eslint-disable react/jsx-key */
import "./styles.scss";
import logo from "../../assets/KoYns-Logo.png";
import commentIcon from "../../assets/commentIcon.svg";
import attach from "../../assets/attach.svg";
import profile from "../../assets/profile.png";
import send from "../../assets/send.svg";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import Button from "../../components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { useCreateCommentMutation, useGetCommentsByTaskIdQuery, useGetTaskByIdQuery } from "../../api/taskApi";
import { formatDate } from "../../utils/date.utils";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addJoinedStatus } from "../../store/employeeReducer";
const TaskDetail = () => {
	const { taskId } = useParams();
	const [commentList, setCommentList] = useState([]);
	const [participantList, setParticipantList] = useState([]);
	const [joined, setJoined] = useState(false);
	const [file, uploadFile] = useState();
	const inputRef = useRef();
	const style = {
		backgroundColor: "white",
		color: "#2c95ce",
		boxShadow: "0.5px 0.5px 0.5px  0.5px #8c96a0",
	};
	const [commentType, setCommentType] = useState("Normal");
	const [comment, setComment] = useState("");
	const [mentionId, setMentionId] = useState();
	const { data: taskDetail, isSuccess: taskSuccess } = useGetTaskByIdQuery(taskId);
	const { data: commentsData, isSuccess: commentSuccess } = useGetCommentsByTaskIdQuery(taskId);
	const loggedState = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const form_fields = [
		{
			id: "description",
			name: "Description",
			// value: "create a bounty tracker system with rewwards and bounty points for tasks completed",
			value: taskDetail?.description,
		},

		{
			id: "skills",
			name: "Skills",
			// value: "Node, react, java, c",
			value: taskDetail?.skillList,
		},
	];
	const [createComment] = useCreateCommentMutation();
	// const [upload, { isSuccess }] = useUploadMutation();
	const handleSend = async () => {
		const formData = new FormData();
		formData.append("file", file);
		// const commentData = {
		// 	id: 9,
		// 	commentType: commentType,
		// 	content: comment,
		// };
		// formData.append("data", JSON.stringify(commentData));
		// formData.append("id", 9);
		formData.append("commentType", commentType);
		formData.append("content", comment);
		createComment({ taskId, formData });

	};
	const handleTextArea = (e) => {
		setComment(e.target.value);
	};
	const handleCommentFilter = (filter) => {
		setCommentType(filter);
	};
	const handleUpload = (e) => {
		uploadFile(e.target.files[0]);
	};
	const handleReply = (id) => {
		inputRef.current.focus();
		setMentionId(id);
	};

	useEffect(() => {
		if (taskSuccess) {
			setParticipantList(taskDetail.data.participants);
			participantList.forEach((participant) => {
				console.log("participant");
			});
		}
	}, [taskSuccess, taskDetail]);
	useEffect(() => {
		participantList.forEach((participant) => {
			// console.log(loggedState)
			console.log(loggedState);
			if (participant.name === loggedState.username) {
				dispatch(addJoinedStatus({ id: taskId, status: "joined" }));
				setJoined(true);
				// console.log("joined")
			}
		});
	}, [participantList]);
	useEffect(() => {
		if (commentSuccess) {
			if (commentType == "Normal") setCommentList(commentsData?.data?.normalComments);
			else setCommentList(commentsData?.data?.reviewComments);
		}
	}, [commentsData, commentType, commentSuccess]);

	return (
		<main className="taskDetail">
			<div className="title">
				<span>
					<h3>Task : # {taskDetail?.data.title}</h3>
				</span>
				<span>
					<h3>Due : {formatDate(taskDetail?.data.deadLine)}</h3>
				</span>
			</div>
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
							<div className="type">{taskDetail?.data.maxParticipants > 1 ? "Group" : "Individual"}</div>
						</div>

						<div className="fields">
							<label> Max Participants</label>
							<div className="maxParticipants">{taskDetail?.data.maxParticipants}</div>
						</div>
					</div>
				</div>
				<div className="detailSectionBounty">
					<h3>Reward</h3> <img src={logo} alt="KoYns logo" />
					<div className="bountyPoints">{taskDetail?.data.totalBounty} KYNs</div>
					<div className="assignedBy">
						<h4>Assigned By : {taskDetail?.data.createdBy.name}</h4>
					</div>
				</div>
			</div>
			<div className="bottomSection">
				{joined ? (
					<div className="commentSection">
						<div className="commentSectionHeader">
							<div className="nameHeader">Name</div>
							<div className="commentHeader">
								<span>Comments</span>
								<div className="commentFilter">
									<div
										className="commentFlag"
										onClick={() => handleCommentFilter("Normal")}
										style={commentType === "Normal" ? style : null}
									>
										Comment
									</div>
									<div
										className="review"
										onClick={() => handleCommentFilter("Review")}
										style={commentType === "Review" ? style : null}
									>
										Review
									</div>
								</div>
							</div>
						</div>

						<div className="commentWrapper">
							<div className="commentList">
								{commentList
									.filter((record) => record.commentType === commentType)
									.map((record) => {
										return (
											<CommentComponent
												key={record.id}
												name={record.employee.name}
												comment={record.content}
												currEmployee="Arun Doe"
												type={record.commentType}
												onClick={() => handleReply(record.id)}
												loggedState={loggedState}
												status={record.review_status}
											/>
										);
									})}
							</div>
							<div className="addComment">
								<img src={commentIcon} alt="Comment Icon" />
								<textarea
									ref={inputRef}
									className="commentBox"
									placeholder="//add comments"
									rows="1"
									onChange={handleTextArea}
								/>
								<span className="commentButtons">
									{commentType === "Review" ? (
										<>
											<label htmlFor="file">
												<img src={attach} alt="Add attachment" />
											</label>
											<input
												type="file"
												id="file"
												className="uploadFile"
												onChange={handleUpload}
											/>

											<Button className="reviewButton" text="Review" onClick={handleSend} />
										</>
									) : (
										<div className="sendButton">
											<img src={send} alt="Send Comment" onClick={handleSend} />
										</div>
									)}
								</span>
							</div>
						</div>
					</div>
				) : (
					<div className="Join Button">Join</div>
				)}

				<div className="particpantsListSection">
					<div className="particpantsListHeader">Particpants</div>
					<div className="particpantsList">
						{participantList.map((participant) => {
							return (
								<div className="partcipants">
									<img src={profile} alt="profile icon" />
									{participant.name}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
};
export default TaskDetail;
