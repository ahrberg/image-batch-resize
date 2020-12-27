import React from "react";

type SectionProps = {
  title: string;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Section;
