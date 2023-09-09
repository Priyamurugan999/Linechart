import React from 'react';
import Plot from "react-plotly.js";

const RenderChart = ({selectedData=[]}) => {
 
  const getLayout = (type) => {
    return {
      title: `${type === "positive"
        ? "Positive Sentiment"
        : type === "negative"
          ? "Negative Sentiment"
          : "Reach"
        }`,
      xaxis: {
        title: "Date"
      },
      yaxis: {
        title: type === "reach" ? "Maximum Reach" : "Counts"
      }
    };
  }

  const getChartData = (type) => {
    switch (type) {
      case "positive":
        return selectedData.map((company) => ({
          x: company.daily_review_counts.map((entry) => entry.date),
          y: company.daily_review_counts.map((entry) => entry.positive_count),
          type: "scatter",
          mode: "lines",
          name: `${company.company_name} Positive`
        }));
      case "negative":
        return selectedData.map((company) => ({
          x: company.daily_review_counts.map((entry) => entry.date),
          y: company.daily_review_counts.map((entry) => entry.negative_count),
          type: "scatter",
          mode: "lines",
          name: `${company.company_name} Negative`
        }));
      case "reach":
        return selectedData.map((company) => ({
          x: company.daily_review_counts.map((entry) => entry.date),
          y: company.daily_review_counts.map((entry) => entry.maximum_reach),
          type: "scatter",
          mode: "lines",
          name: `${company.company_name} Max Reach`
        }));
      default:
        return [];
    }
  };

  return (
    <>
      {
        selectedData?.length ?
          <>
            <div>
              <Plot data={getChartData('reach')} layout={getLayout("reach")} />
            </div>
            <div>
              <Plot data={getChartData('positive')} layout={getLayout("positive")} />
            </div>
            <div>
              <Plot data={getChartData('negative')} layout={getLayout("negative")} />
            </div>
          </> : null
      }
    </>
  );
};

export default RenderChart;
