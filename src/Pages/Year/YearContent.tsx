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

const MonthContent = () => {
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
                    Testing testing 123
                </Container>
            </SpaceBetween>
        </ContentLayout>
    );
};

export default MonthContent;