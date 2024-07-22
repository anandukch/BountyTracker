const DetailBlock = ({ header, content }) => {
  return (
    <div className="employeeDetailBlock">
      <h4>{header}</h4>
      <p>{content}</p>
    </div>
  );
};
export default DetailBlock;
