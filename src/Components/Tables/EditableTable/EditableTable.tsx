import React, { ReactNode, useState } from "react";
import { Box, Button, Header,  Pagination, TextFilter,  Table, TableProps } from "@cloudscape-design/components";
import { useCollection } from '@cloudscape-design/collection-hooks';
import { CategoryRow, Row, RowDataType } from "../../../Types/Row";

interface EditableTableProps {
    data: RowDataType[];
    title: string;
    columnDefinitions: TableProps<RowDataType>['columnDefinitions'];
    filtering?: boolean;
    pagination?: boolean;
    pageSize?: number;
    sorting?: boolean;
    onDelete?: (rows: RowDataType[]) => void;
}

// TODO: Make individual cells editable
const EditableTable = (props: EditableTableProps) => {

    const [selectedItems, setSelectedItems] = useState<RowDataType[]>();
    
    const deleteItems = () => {
        if (!props.onDelete
            || selectedItems == undefined
            || selectedItems?.length === 0) return;
        props.onDelete(selectedItems);
    }

    const { items, paginationProps, collectionProps } = useCollection<RowDataType>(
        props.data,
        {
            filtering: {},
            pagination: { pageSize: props.pagination ? props.pageSize: Infinity}, // There has to a better way to do this.
            sorting: { defaultState: { sortingColumn: props.columnDefinitions[0] } },
            selection: {},
        });

    return (
        <Table<RowDataType>
            {...collectionProps}
            columnDefinitions={props.columnDefinitions}
            sortingDisabled={!props.sorting}
            onSelectionChange={({ detail }) => {
                setSelectedItems(detail.selectedItems);
            }}
            selectedItems={selectedItems}
            selectionType="multi"
            variant="embedded"
            items={items}
            loadingText="Loading resources"
            stickyHeader
            stripedRows
            header={
                <Header
                    children={props.title}
                    actions={
                        <Button
                            children="Delete"
                            disabled={selectedItems === undefined || selectedItems?.length === 0}
                            onClick={deleteItems}
                        />
                    }
                />
            }
            pagination={props.pagination && <Pagination {...paginationProps}/>}
        />
    );
}

export default EditableTable;