"use client";

import React from "react";
import Image from "next/image";

// Define interface for process steps
interface ProcessStep {
  id: number;
  number: number;
  title: string;
  description: string;
}

const WorkingProcess: React.FC = () => {
  // Dynamic data for process steps
  const processSteps: ProcessStep[] = [
    {
      id: 1,
      number: 1,
      title: "Analysis & Research",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagittis, donec.",
    },
    {
      id: 2,
      number: 2,
      title: "Define Your Goals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagittis, donec.",
    },
    {
      id: 3,
      number: 3,
      title: "Monitor the Results",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagittis, donec.",
    },
  ];

  return (
    <>
      <div className="working-process-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="working-process-content">
                <span className="sub-title">Our Working Process</span>
                <h2>Dedicated to help anything people&apos;s needs</h2>
                
                <ul className="working-process-list">
                  {processSteps.map((step) => (
                    <li
                      key={step.id}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-once="true"
                      data-aos-delay={step.id * 100}
                    >
                      <div className="number">{step.number}</div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div
                className="working-process-image"
                style={{
                  backgroundImage: `url(/images/working-process.jpg)`,
                }}
              >
                <Image
                  src="/images/working-process.jpg"
                  alt="working-process"
                  width={720}
                  height={952}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingProcess;
