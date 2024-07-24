const TaskColumnData = (props) => {
  const statusValues = ["Completed", "In Progress", "In Review"]; // Define your status values here

  const hasStatusBackground = statusValues.includes(props.content);
  
  let dynamicStyles = {
    backgroundColor: hasStatusBackground ? props.color : "transparent",
  };

  if (hasStatusBackground) {
    // Add additional styles when there is a status background
    dynamicStyles = {
      ...dynamicStyles,
      border: `2px solid ${props.color}`,  
      borderRadius: "4px", 
      padding: "8px", 
      borderStyle:"solid",
      paddingLeft:"9px",
      alignItems:"center",
      minWidth:"fit-content",
      display: "inline-block",
      maxWidth:"fit-content",

    };
  }

  return (
    <div className="taskDataColumn" style={dynamicStyles}>
      <p>{props.content}</p>
    </div>
  );
};

export default TaskColumnData;
