import React from "react";
import { Box, Button, Container, SpaceBetween, TableProps } from "@cloudscape-design/components";
import { Row, RowDataType } from "../../../Types/Row";
import { floatToDollarAmount } from "../../../Util/ProcessDataUtil";
import EditableTable from "../EditableTable/EditableTable";

interface BatchInputTableProps {
    data: Row[];
    title: string;
    onSubmit: () => void;
    onDelete: (rows: RowDataType[]) => void;
}

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

const BatchInputTable = (props: BatchInputTableProps) => {
    return (
        <Container>
            <SpaceBetween size="m">
                <EditableTable
                    data={props.data}
                    title={`${props.title} Itemized Spending`}
                    columnDefinitions={dataColumnDefinitions as TableProps.ColumnDefinition<RowDataType>[]} 
                    sorting={false}
                    onDelete={props.onDelete}
                />
                <Box textAlign="right">
                    <Button variant="primary" children="Submit" formAction="submit" onClick={props.onSubmit}/>
                </Box>
            </SpaceBetween>
        </Container>
    );
};

export default BatchInputTable;