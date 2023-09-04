import React, { useState } from "react";
import { Box, Button, BarChart, MixedLineBarChartProps } from "@cloudscape-design/components";
import { Coordinate, Range } from "../../../Types/Pair";
import { getRange } from "../../../Util/ProcessDataUtil";

interface StackedChartProps {
    data:  { title: string, type: string, data: Coordinate[] }[];
    xDomain: number[];
}

const StackedChart = (props: StackedChartProps) => {

    return (
        <BarChart
            series={props.data as unknown as ReadonlyArray<MixedLineBarChartProps.BarDataSeries<Date>>}
            xDomain={props.xDomain.map(d => new Date(d))}
            yDomain={[0, getRange(props.data.map(({data}) => data).flat()).max-2500]}
            i18nStrings={{
                xTickFormatter: e =>
                e.toLocaleDateString("en-US", {month: "short",day: "numeric",}).split(",").join("\n")
            }}
            ariaLabel="Stacked bar chart"
            height={300}
            stackedBars
            xTitle="Date"
            yTitle="$"
            detailPopoverSize="large"
            empty={
                <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                    <Box variant="p" color="inherit">
                        There is no data available
                    </Box>
                </Box>
            }
            noMatch={
                <Box textAlign="center" color="inherit">
                    <b>No matching data</b>
                    <Box variant="p" color="inherit">
                        There is no matching data to display
                    </Box>
                    <Button>Clear filter</Button>
                </Box>
            }
        />  
    );
}

export default StackedChart;