import './styles.scss'
const CommentComponent = ({name,comment}) => {
   return (
      <div className="commentRecord">
         <div className="name">{name}</div>
         <div className="comment">{comment}</div>
      </div>
   );
};
export default CommentComponent;
