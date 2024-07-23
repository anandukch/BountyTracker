import { useEffect } from 'react';
import "../ProgressBar/progressbar.scss"

const Progressbar = () => {
  useEffect(() => {
    const skillPers = document.querySelectorAll(".skill-per");

    skillPers.forEach(function(skillPer) {
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

  return (
    <div className="skill-main">
      <div className="skill-wrrap">
        <div className="skill-name">Progress</div>
        <div className='skill-bar-frame'>
        <div className="skill-bar">
          <div className="skill-per" per="50"></div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Progressbar;
