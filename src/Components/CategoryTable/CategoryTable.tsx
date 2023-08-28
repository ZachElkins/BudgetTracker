import React from "react";
import { Container, TableProps } from "@cloudscape-design/components";
import { CategoryRow, Row, RowDataType } from "../../Types/Row";
import { calculateDataByCategory, floatToDollarAmount } from "../../Util/ProcessData";
import DataTable from "../DataTable/DataTable";

interface CategoryTableProps {
    data: Row[];
    title: string;
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
    },
];


const CategoryTable = (props: CategoryTableProps) => {

    return (
        <Container>
            <DataTable
                data={calculateDataByCategory(props.data)}
                title={`${props.title} Spending by Category`}
                columnDefinitions={categoryDataColumnDefinitions as TableProps.ColumnDefinition<RowDataType>[]}
                sorting={true}    
            />
        </Container>
    );
};

export default CategoryTable;