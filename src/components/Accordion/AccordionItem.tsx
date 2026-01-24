"use client";

import React from "react";

interface AccordionItemProps {
  showDescription: string;
  ariaExpanded: boolean;
  fontWeightBold: string;
  item: {
    question: string;
    answer: string;
  };
  index: number;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
}) => (
  <div className="faq__question">
    <dt>
      <button
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        data-qa="faq__question-button"
        className={`faq__question-button ${fontWeightBold}`}
        onClick={onClick}
      >
        {item.question}
      </button>
    </dt>
    <dd>
      <p
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`faq__desc ${showDescription}`}
      >
        {item.answer}
      </p>
    </dd>
  </div>
);

export default AccordionItem;
