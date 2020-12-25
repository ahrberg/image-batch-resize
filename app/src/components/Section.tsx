import React from "react";

type SectionProps = {
  title: string;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div>
      <text>{title}</text>
      {children}
    </div>
  );
};

export default Section;
