import React from "react";
import { Container, TableProps } from "@cloudscape-design/components";
import { CategoryRow, Row, RowDataType } from "../../../Types/Row";
import { calculateDataByCategory, floatToDollarAmount } from "../../../Util/ProcessDataUtil";
import DataTable from "../DataTable/DataTable";

interface CategoryTableProps {
    data: Row[];
    title: string;
    average?: {
        title: string;
        interval: number;
    };
}

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
    }
];


const CategoryTable = (props: CategoryTableProps) => {
    const columnDefenitions: TableProps<CategoryRow>['columnDefinitions'] = props.average ?
        [...categoryDataColumnDefinitions, {
            id: "average",
            header: `Average per ${props.average.title}`,
            cell: ({ sum }) => floatToDollarAmount(sum / props.average!.interval) || "-",
            sortingField: "sum",
            sortingComparator: (a, b) => a.sum - b.sum > 0 ? 1 : -1,
        }]
        : categoryDataColumnDefinitions;

    return (
        <Container>
            <DataTable
                data={calculateDataByCategory(props.data)}
                title={`${props.title} Spending by Category`}
                columnDefinitions={columnDefenitions as TableProps.ColumnDefinition<RowDataType>[]}
                sorting={true}
            />
        </Container>
    );
};

export default CategoryTable;