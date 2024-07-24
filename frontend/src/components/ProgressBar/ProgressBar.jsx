/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../ProgressBar/progressbar.scss";

const Progressbar = (props) => {
  let color = "#FEA82F";
  let boxShadowColor = "#F48725";  
  let borderColor = "#F9C98B";  

  if (props.per >= 70) {
    color = "#9CDBA6";
    boxShadowColor = "#5F9362";  
    borderColor = "#78B485";  
  }
  if (props.per <= 30) {
    color = "#C1292E";
    boxShadowColor = "#8C1F23"; 
    borderColor = "#D16C70";  
  }
	useEffect(() => {
		const skillPers = document.querySelectorAll(".skill-per");

		skillPers.forEach(function (skillPer) {
			const per = parseFloat(skillPer.getAttribute("per"));

			let animatedValue = 0;
			let startTime = null;

			function animate(timestamp) {
				if (!startTime) startTime = timestamp;
				const progress = timestamp - startTime;
				const stepPercentage = progress / 1000;

				if (stepPercentage < 1) {
					animatedValue = per * stepPercentage;
					skillPer.style.width = Math.floor(animatedValue) + "%";
					requestAnimationFrame(animate);
				} else {
					animatedValue = per;
					skillPer.style.width = Math.floor(animatedValue) + "%";
				}
			}

			requestAnimationFrame(animate);
		});
	}, []);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--before-bg-color', color);
    root.style.setProperty('--after-bg-color', color); 
  }, [color]);
	return (
		<div className="skill-main">
			<div className="skill-wrrap">
				<div className="skill-name"></div>
        <div className="skill-bar-frame" style={{ boxShadow: `inset 0px 0px 2px 2px ${boxShadowColor}`, borderColor: borderColor }}>
          <div className="skill-bar">
            <div className="skill-per" per={props.per} style={{ backgroundColor: color }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Progressbar;
