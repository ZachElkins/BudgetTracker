import React from "react";
import { Container, TableProps } from "@cloudscape-design/components";
import { Row, RowDataType } from "../../../Types/Row";
import { floatToDollarAmount } from "../../../Util/ProcessDataUtil";
import DataTable from "../DataTable/DataTable";

interface ItemizedTableProps {
    data: Row[];
    title: string;
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

const ItemizedTable = (props: ItemizedTableProps) => {
    return (
        <Container>
            <DataTable
                data={props.data}
                title={`${props.title} Itemized Spending`}
                columnDefinitions={dataColumnDefinitions as TableProps.ColumnDefinition<RowDataType>[]} 
                sorting={true}
                pagination={true}
                pageSize={10}
                filtering={true}
            />
        </Container>
    );
};

export default ItemizedTable;