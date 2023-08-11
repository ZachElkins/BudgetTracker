import React, { useState } from "react";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { Box, Container, ContentLayout, Header, SpaceBetween, SplitPanel, TableProps, Toggle } from "@cloudscape-design/components";
import { getAvailableFiles, readFile } from "../../Util/ReadFile";
import { CategoryRow, DataRow, Row, RowDataType } from "../../Types/Row";
import CustomLineChart from "../../Components/CustomLineChart/CustomLineChart";
import { calculateDataByCategory, createPairsWithSum, toRow, floatToDollarAmount, buildStackedDataFromCategories, createListOfEpochSeconds } from "../../Util/ProcessData";
import MonthSelector from "../../Components/MonthSelector/MonthSelector";
import DataTable from "../../Components/DataTable/DataTable";
import StackedChart from "../../Components/StackChart/StackChart";

const dataColumnDefinitions: TableProps<Row>['columnDefinitions'] = [
    {
        id: "date",
        header: "Date",
        cell: ({ date }) => new Date(date).toLocaleDateString() || "-",
        sortingField: "date",
        maxWidth: "100px"
    },
    {
        id: "item",
        header: "Item(s)",
        cell: ({ title }) => title || "-",
        sortingField: "title",
        minWidth: "175px"
    },
    {
        id: "price",
        header: "Price",
        cell: ({ price }) => floatToDollarAmount(price) || "-",
        sortingField: "price",
        sortingComparator: (a, b) => a.price - b.price > 0 ? 1 : -1,
        minWidth: "100x"
    },
    {
        id: "category",
        header: "Category",
        cell: ({ category }) => category || "-",
        sortingField: "category",
        minWidth: "150px"
    },
    {
        id: "location",
        header: "Purchased Location",
        cell: ({ notes }) => notes || "-",
        sortingField: "notes",
    }
];

// Maybe these should be two seperate tables
const categoryDataColumnDefinitions: TableProps<CategoryRow>['columnDefinitions'] = [
    {
        id: "category",
        header: "Category",
        cell: ({ category }) => category || "-",
        sortingField: "category",
        // minWidth: "150px"
    },
    {
        id: "sum",
        header: "Sum",
        cell: ({ sum }) => floatToDollarAmount(sum) || "-",
        sortingField: "sum",
        sortingComparator: (a, b) => a.sum - b.sum > 0 ? 1 : -1,
        // maxWidth: "100px"
    },
    {
        id: "quantity",
        header: "Quantity",
        cell: ({ quantity }) => quantity || "-",
        sortingField: "quantity",
        // maxWidth: "100px"
    },
];

const LandingContent = () => {
    const monthsByYearMap: Map<string, OptionDefinition[]> = getAvailableFiles();

    const [data, setData] = useState<Row[]>([]);
    const [dataPoints, setDataPoints] = useState<{x: number, y: number}[]>([]);
    
    const [year, setYear] = useState<OptionDefinition>();
    const [month, setMonth] = useState<OptionDefinition>();
    const [chartTitle, setChartTitle] = useState<string>("");
    const [runningTotal, setRunningTotal] = useState<boolean>(false);

    const handleClick = async (): Promise<void> => {
        const fetechedData: DataRow[] = await readFile(month!.value!, year!.value!);
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
                    {/* {readFile()} */}
                    <MonthSelector monthsByYearMap={monthsByYearMap} onSelect={handleSelect} onClick={handleClick} />
                </Container>

                    { dataPoints.length > 0 &&
                        <SpaceBetween size="m">
                            <Container>
                                <Header variant="h3">{chartTitle} Spending Over Time</Header>
                                    <Toggle onChange={({ detail }) => setRunningTotal(detail.checked)} checked={runningTotal}>
                                        Running Total
                                    </Toggle>
                                <CustomLineChart data={dataPoints} title={chartTitle} runningTotal={runningTotal} />
                            </Container>
                            <Container>
                                <DataTable
                                    data={data}
                                    title={`${chartTitle} Itemized Spending`}
                                    columnDefinitions={dataColumnDefinitions as TableProps.ColumnDefinition<RowDataType>[]} 
                                    sorting={true}
                                    pagination={true}
                                    pageSize={10}
                                    filtering={true}
                                />
                            </Container>
                            <Container>
                                <DataTable
                                    data={calculateDataByCategory(data)}
                                    title={`${chartTitle} Spending by Category`}
                                    columnDefinitions={categoryDataColumnDefinitions as TableProps.ColumnDefinition<RowDataType>[]}
                                    sorting={true}    
                                />
                            </Container>
                            <Container>
                                <StackedChart data={buildStackedDataFromCategories(data)} xDomain={createListOfEpochSeconds(data)}/>
                            </Container>
                        </SpaceBetween>
                    }
            </SpaceBetween>
        </ContentLayout>
    );
};

export default LandingContent;