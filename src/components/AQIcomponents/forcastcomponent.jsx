import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import moment from "moment";

const chartConfig = {
  avg: {
    label: "Average",
  },
  min: {
    label: "Minimum",
  },
  max: {
    label: "Maximum",
  },
};

const ForecastComponent = ({ forecast }) => {

  return (
    <>
      {Object.entries(forecast?.daily || {}).map(([key, value]) => (
        <div
          key={key}
          className="rounded-xl w-full p-10 my-5 shadow-lg bg-base-200"
        >
          <div className="text-2xl font-semibold mb-5 border-s-4 p-2 text-green-500 border-green-500">
            {(key === "pm25" ? "pm2.5" : key).toUpperCase()} Forecast
          </div>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart accessibilityLayer data={value}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickMargin={10}
                tickFormatter={(value) =>
                  moment(value).calendar({
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "ddd, DD",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD/MM/YYYY",
                  })
                }
              />
              <YAxis domain={["dataMin", "dataMax + 2"]} tickCount={10} />
              <Line dataKey="min" stroke="#ff0" type="monotone" />
              <Line dataKey="avg" stroke="#f0f" type="monotone" />
              <Line dataKey="max" stroke="#0ff" type="monotone" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </div>
      ))}
    </>
  );
};

export default ForecastComponent;
