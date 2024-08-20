import * as React from "react";
// import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 14,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2} fontWeight={500}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithPaddingAngle({ data = [] }) {
  return (
    <PieChart
      // sx={{ boxShadow: 3 }}
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          paddingAngle: 1,
          innerRadius: 80,
          outerRadius: 120,
          data,
        },
      ]}
      margin={{ right: 5 }}
      // margin={{ top: 5 }}
      width={300}
      height={300}
      slotProps={{
        legend: {
          hidden: false,

          direction: "row",
          position: { vertical: "bottom", horizontal: "right" },
          padding: 0,
        },
      }}
    >
      <PieCenterLabel> {data[0]?.value} Transactions</PieCenterLabel>
    </PieChart>
  );
}
