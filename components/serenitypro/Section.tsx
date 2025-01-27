import React from "react";
import PortfolioTemplateCard from "./Card";

function Section() {
  return (
    <div className="bg-black flex items-center justify-center mb-5 mt-20 gap-5 p-3 sm:p-5 flex-col md:flex-row">
      <PortfolioTemplateCard
        previewUrl="https://preview-portfolio-template.netlify.app/"
        buyUrl="https://ayushmxxn.gumroad.com/l/portfolio-template"
        imageUrl="https://i.ibb.co/fxZmkfL/portfoliotemplate.png"
        hoverImageUrl="https://i.ibb.co/tMFnHqC/Screenshot-2024-09-15-182118.png"
        title="Portfolio Template"
        description="Modern and professional template to showcase your best work."
        price={5}
        features={[
          "Responsive",
          "SEO optimized",
          "Easily Customizable",
          "Light and dark mode",
        ]}
      />
    </div>
  );
}

export default Section;
