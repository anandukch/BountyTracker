import "./styles.scss";
import logo from "../../assets/KoYns-Logo.png";
import commentIcon from "../../assets/commentIcon.svg";
import attach from "../../assets/attach.svg";
import profile from "../../assets/profile-img.svg";
import send from "../../assets/send.svg";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
const TaskDetail = () => {
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
   const comments = [
      {
         id: 1,
         name: "sanoj",
         comment: "hey need bug fix",
      },
      {
         id: 2,
         name: "sanoj",
         comment: "hey need bug fix",
      },
   ];

   const particpants = [
      {
         name: "Sanoj",
      },
      {
         name: "John",
      },
   ];
   return (
      <main className="taskDetail">
         <div className="title">
            <span>
               <h3>Task :</h3> #name
            </span>
            <span>
               <h3>Due :</h3> #due date
            </span>
         </div>
         <div className="details">
            <div className="detailSectionData">
               {form_fields.map((fields) => {
                  return (
                     <div className="fields">
                        <label> {fields.name}</label>
                        <div className={fields.id}>{fields.value}</div>
                     </div>
                  );
               })}
               <div className="typeSection">
                  <div className="fields">
                     <label> Type</label>
                     <div className="type">Individual</div>
                  </div>
                  {true ? (
                     <div className="fields">
                        <label> Max Participants</label>
                        <div className="maxParticipants">5</div>
                     </div>
                  ) : null}
               </div>
            </div>
            <div className="detailSectionBounty">
               <h3>Reward</h3> <img src={logo} alt="KoYns logo" />
               <div className="bountyPoints">200 KYns</div>
               <div className="assignedBy"><h4>Assigned By : </h4>George</div>
            </div>
         </div>
         <div className="bottomSection">
            <div className="commentSection">
               <div className="commentSectionHeader">
                  <div className="nameHeader">Name</div>
                  <div className="commentHeader">Comments</div>
               </div>
               <div className="commentWrapper">
                  <div className="commentList">
                     {comments.map((record) => {
                        return <CommentComponent key={record.id} name={record.name} comment={record.comment} />;
                     })}
                  </div>
                  <div className="addComment">
                     <img src={commentIcon} alt="Comment Icon" />
                     <textarea className="commentBox" placeholder="//add comments" rows="1" />
                     <span className="commentButtons">
                        <img src={attach} alt="Add attachment" />{" "}
                        <div className="sendButton">
                           <img src={send} alt="Send Comment" />
                        </div>
                        <Button className="reviewButton" text="Review"/>
                     </span>
                  </div>
               </div>
            </div>
            <div className="particpantsListSection">
               <div className="particpantsListHeader">Particpants</div>
               <div className="particpantsList">
                  {particpants.map((participant) => {
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
