import React from "react";
import PieChart from "@cloudscape-design/components/pie-chart";
import { Container } from "@cloudscape-design/components";

interface PieChartProps {
    data: {
        title: string,
        value: number
    }[];
}

const CustomPieChart = (props: PieChartProps) => {

    return (
        <Container>
            <PieChart
                data={props.data}
            />
        </Container>
    );
};

export default CustomPieChart;