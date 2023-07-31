import React, { useEffect, useState } from "react";
import { Box, Button, LineChart } from "@cloudscape-design/components";
import { Pair, Row } from "../../Types/Row";
import { floatToDollarAmount } from "../../Util/ProcessData";

interface LineChartProps {
    data: {x: number, y: number}[];
    title: string,
    runningTotal: boolean
}

const getRange = (data: {x: number, y: number}[]): {min: number, max: number} => {
    const values: number[] = data.map(({y}) => y);
    return {
        max: Math.max(...values),
        min: Math.min(...values)
    }
};

const getRunningTotal = (data: {x: number, y: number}[]): {x: number, y: number}[] => {
    const dataPoints: {x: number, y: number}[] = [];
    let sum = 0;
    for (const point of data) {
        sum += point.y;
        dataPoints.push({...point, y: sum});
    }
    return dataPoints;
}

const CustomLineChart = (props: LineChartProps) => {
    const runningTotalData: {x: number, y: number}[] = getRunningTotal(props.data);
    const runningTotalRange = getRange(runningTotalData);
    const baseDataRange = getRange(props.data);
    const [dataPoints, setDataPoints] = useState<{x: number, y: number}[]>(props.data);
    const [range, setRange] = useState<{max: number, min: number}>(baseDataRange);

    useEffect(() => {
        setDataPoints(props.runningTotal ? runningTotalData : props.data);
        setRange(props.runningTotal ? runningTotalRange : baseDataRange)
    }, [props.runningTotal, props.data]);
    
    return (
        <LineChart
            series={[
                {
                    title: props.title,
                    type: "line",
                    data: dataPoints.map((item: Pair) => {
                        return {x: new Date(item.x), y: item.y}
                    }),
                    valueFormatter: (e) => {
                        return floatToDollarAmount(e);
                    }
                }
            ]}
            xDomain={[
                new Date(dataPoints[0].x),
                new Date(dataPoints[dataPoints.length-2].x)
            ]}
            yDomain={[0, range.max]}
            i18nStrings={{
                xTickFormatter: e =>
                    new Date(e).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                    }).split(",").join("\n"),
                yTickFormatter: function s(e) {
                    return Math.abs(e) >= 1e9
                        ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                            "G"
                        : Math.abs(e) >= 1e6
                        ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                            "M"
                        : Math.abs(e) >= 1e3
                        ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                            "K"
                        : e.toFixed(2);
                }
            }}
            ariaLabel="Single data series line chart"
            height={300}
            hideFilter
            hideLegend
            xScaleType="time"
            xTitle="Day"
            yTitle="$"
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

export default CustomLineChart;