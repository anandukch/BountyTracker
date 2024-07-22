import "./styles.scss";
import logo from "../../assets/KoYns-Logo.png";
import commentIcon from "../../assets/commentIcon.svg";
import attach from "../../assets/attach.svg";
import profile from "../../assets/profile-img.svg";
import send from "../../assets/send.svg";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import {
	useCreateCommentMutation,
	useGetCommentsByTaskIdQuery,
	useGetTaskByIdQuery,
	useGetTaskListQuery,
	useLazyGetTaskByIdQuery,
} from "../../api/taskApi";
import { formatDate } from "../../utils/date.utils";
import { useGetEmployeeQuery } from "../../api/employeeApi";
const TaskDetail = () => {
	const [commentList, setCommentList] = useState([]);
	const [participantList, setParticipantList] = useState([]);
	const form_fields = [
		{
			id: "description",
			name: "Description",
			value: "create a bounty tracker system with rewwards and bounty points for tasks completed",
		},

		{
			id: "skills",
			name: "Skills",
			value: "Node, react, java, c",
		},
	];
	const [commentType, setCommentType] = useState("Normal");
	const [comment, setComment] = useState("");
	const { data: taskDetail } = useGetTaskByIdQuery(2);
	// const {data: comments}=useGetCommentsByTaskIdQuery(2)
	const [createComment, { data, isSuccess }] = useCreateCommentMutation();
	const handleSend = (e) => {
      const commentData={
         id:2,
         commentType:commentType,
         content:comment
      }
      createComment(commentData)
		console.log(comment);
	};
	const handleTextArea = (e) => {
		setComment(e.target.value);
      
	};
	const handleCommentFilter = (filter) => {
		setCommentType(filter);
	};
	useEffect(() => {
		if (taskDetail?.data) {
			setCommentList(taskDetail.data.comments);
			setParticipantList(taskDetail.data.participants);
			// console.log(commentList);
		}
	});

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
						{true ? (
							<div className="fields">
								<label> Max Participants</label>
								<div className="maxParticipants">{taskDetail?.data.maxParticipants}</div>
							</div>
						) : null}
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
				<div className="commentSection">
					<div className="commentSectionHeader">
						<div className="nameHeader">Name</div>
						<div className="commentHeader">
							<span>Comments</span>
							<div className="commentFilter">
								<div
									className="commentFlag"
									onClick={() => handleCommentFilter("Normal")}
									style={commentType === "Normal" ? { backgroundColor: "white" } : null}
								>
									Comment
								</div>
								<div
									className="review"
									onClick={() => handleCommentFilter("Review")}
									style={commentType === "Review" ? { backgroundColor: "white" } : null}
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
										<CommentComponent key={record.id} name={record.name} comment={record.content} />
									);
								})}
						</div>
						<div className="addComment">
							<img src={commentIcon} alt="Comment Icon" />
							<textarea
								className="commentBox"
								placeholder="//add comments"
								rows="1"
								onChange={handleTextArea}
							/>
							<span className="commentButtons">
								<img src={attach} type="file" alt="Add attachment" />
								{commentType === "Review" ? (
									<Button className="reviewButton" text="Review" onClick={handleSend}/>
								) : (
									<div className="sendButton">
										<img src={send} alt="Send Comment" onClick={handleSend} />
									</div>
								)}
							</span>
						</div>
					</div>
				</div>
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
