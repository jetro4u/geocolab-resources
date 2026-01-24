"use client";

import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface AccordionProps {
  questionsAnswers: QuestionAnswer[];
}

const Accordion: React.FC<AccordionProps> = ({ questionsAnswers }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderedQuestionsAnswers = questionsAnswers.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = index === activeIndex;

    return (
      <AccordionItem
        key={index}
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        onClick={() => {
          setActiveIndex(index);
        }}
      />
    );
  });

  return (
    <div className="faq">
      <dl className="faq__list">{renderedQuestionsAnswers}</dl>
    </div>
  );
};

export default Accordion;

