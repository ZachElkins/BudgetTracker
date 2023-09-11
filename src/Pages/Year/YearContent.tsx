import React, { useState } from "react";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { Button, Container, ContentLayout, Header, SpaceBetween, Toggle } from "@cloudscape-design/components";
import { getAllDataFromYear, getMonthByYearOptions, readFile } from "../../Util/FileReadUtil";
import YearSelector from "../../Components/YearSelector/YearSelector";
import { DataRow, Row } from "../../Types/Row";
import CustomLineChart from "../../Components/Charts/CustomLineChart/CustomLineChart";
import { createPairsWithSum, generatePieChartData, toRow } from "../../Util/ProcessDataUtil";
import CategoryTable from "../../Components/Tables/CategoryTable/CategoryTable";
import CustomPieChart from "../../Components/Charts/CustomPieChart/CustomPieChart";
import { updateFile } from "../../Util/FileWriteUtil";

const YearContent = () => {
    const [year, setYear] = useState<OptionDefinition>();
    const monthsByYearMap: Map<string, OptionDefinition[]> = getMonthByYearOptions();
    const yearOptions: OptionDefinition[] = [...monthsByYearMap.keys()].map((year: string) => {
        return {label: year, value: year};
    });

    const [data, setData] = useState<Row[]>([]);
    const [dataPoints, setDataPoints] = useState<{x: number, y: number}[]>([]);
    
    const [runningTotal, setRunningTotal] = useState<boolean>(false);
    const [chartTitle, setChartTitle] = useState<string>("");
    const [chartStatus, setChartStatus] = useState< "finished" | "loading" | undefined>("finished");
    const [average, setAverage] = useState<{title: string, interval: number}>();
    
    // TODO: There has to be a better way to do this.
    const handleClick = async () => {
        setChartStatus("loading");
        const fetchedData: Map<string, DataRow[]> = await getAllDataFromYear(year!.value!, monthsByYearMap.get(year!.value!)!);
        setChartStatus("finished");
        const rawData: Row[] = Array.from(fetchedData.values()).flatMap((v) => v.map(toRow));

        setData(rawData);
        setChartTitle(`${year?.label}`);
        setDataPoints(createPairsWithSum(rawData));
        setAverage({interval: fetchedData.size, title: "Month"});
    };

    const handleSelect = (year: OptionDefinition) => {
        setYear(year);
    };

    return (
        <ContentLayout
            header={
                <SpaceBetween size="m">
                    <Header variant="h1">
                        Yearly Spending
                    </Header>
                </SpaceBetween>
            }
        >
            <SpaceBetween size="s">
                <Container>
                    <YearSelector years={yearOptions} onSelect={handleSelect} onClick={handleClick} />
                </Container>
                <Container>
                    <Header variant="h3">{chartTitle} Spending Over Time</Header>
                        <Toggle onChange={({ detail }) => setRunningTotal(detail.checked)} checked={runningTotal}>
                            Running Total
                        </Toggle>
                    <CustomLineChart data={dataPoints} title={chartTitle} runningTotal={runningTotal} status={chartStatus} />
                </Container>
                <CategoryTable data={data} title={chartTitle} average={average} />
                <CustomPieChart data={generatePieChartData(data)} />
            </SpaceBetween>
        </ContentLayout>
    );
};

export default YearContent;