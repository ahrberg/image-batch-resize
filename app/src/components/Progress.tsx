import React from "react";
import "./Progress.css";

type ProgressProps = {
  percent: number;
};

const Progress: React.FC<ProgressProps> = ({ percent }) => {
  const width = Math.ceil(Math.min(100, Math.max(percent, 0)));

  return (
    <div className="Progress">
      <div className="Progress-content">
        <h2>Resizing images 🚀</h2>
        <h2>{width}%</h2>
        <div className="Progress-bar" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
};

export default Progress;
