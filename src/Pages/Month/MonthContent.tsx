import React, { useState } from "react";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { Box, Container, ContentLayout, Header, SpaceBetween, SplitPanel, TableProps, Toggle } from "@cloudscape-design/components";
import { getAvailableFiles, readFile } from "../../Util/ReadFile";
import { DataRow, Row, RowDataType } from "../../Types/Row";
import CustomLineChart from "../../Components/CustomLineChart/CustomLineChart";
import { calculateDataByCategory, createPairsWithSum, toRow, buildStackedDataFromCategories, createListOfEpochSeconds } from "../../Util/ProcessData";
import MonthSelector from "../../Components/MonthSelector/MonthSelector";
import DataTable from "../../Components/DataTable/DataTable";
import StackedChart from "../../Components/StackChart/StackChart";
import ItemizedTable from "../../Components/ItemizedTable/ItemizedTable";
import CategoryTable from "../../Components/CategoryTable/CategoryTable";

const MonthContent = () => {
    const monthsByYearMap: Map<string, OptionDefinition[]> = getAvailableFiles();

    const [data, setData] = useState<Row[]>([]);
    const [dataPoints, setDataPoints] = useState<{x: number, y: number}[]>([]);
    
    const [year, setYear] = useState<OptionDefinition>();
    const [month, setMonth] = useState<OptionDefinition>();
    const [chartTitle, setChartTitle] = useState<string>("");
    const [runningTotal, setRunningTotal] = useState<boolean>(false);

    const [chartStatus, setChartStatus] = useState< "finished" | "loading" | undefined>("finished")

    const handleClick = async (): Promise<void> => {
        setChartStatus("loading");
        const fetechedData: DataRow[] = await readFile(month!.value!, year!.value!).then((data) => {
            setChartStatus("finished");
            return (data);
        });
        const rawData: Row[] = fetechedData.map(toRow);
        setData(rawData);
        setChartTitle(`${month?.label} ${year?.label}`);
        setDataPoints(createPairsWithSum(rawData));
    };

    const handleSelect = (year: OptionDefinition, month: OptionDefinition) => {
        setYear(year);
        setMonth(month);
    };

    return (
        <ContentLayout
            header={
                <SpaceBetween size="m">
                    <Header variant="h1">
                        Monthly Spending
                    </Header>
                </SpaceBetween>
            }
        >
            <SpaceBetween size="s">
                <Container>
                    <MonthSelector monthsByYearMap={monthsByYearMap} onSelect={handleSelect} onClick={handleClick} />
                </Container>
                        <SpaceBetween size="m">
                            <Container>
                                <Header variant="h3">{chartTitle} Spending Over Time</Header>
                                    <Toggle onChange={({ detail }) => setRunningTotal(detail.checked)} checked={runningTotal}>
                                        Running Total
                                    </Toggle>
                                <CustomLineChart data={dataPoints} title={chartTitle} runningTotal={runningTotal} status={chartStatus}/>
                            </Container>
                            <ItemizedTable data={data} title={chartTitle}/>
                            <CategoryTable data={data} title={chartTitle}/>
                            {/* <Container>
                                <StackedChart data={buildStackedDataFromCategories(data)} xDomain={createListOfEpochSeconds(data)}/>
                            </Container> */}
                        </SpaceBetween>
            </SpaceBetween>
        </ContentLayout>
    );
};

export default MonthContent;