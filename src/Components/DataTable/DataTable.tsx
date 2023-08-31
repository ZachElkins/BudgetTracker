import React, { ReactNode } from "react";
import { Box, Button, Header,  Pagination, TextFilter,  Table, TableProps } from "@cloudscape-design/components";
import { useCollection } from '@cloudscape-design/collection-hooks';
import { CategoryRow, Row, RowDataType } from "../../Types/Row";

interface DataTableProps {
    data: RowDataType[];
    title: string;
    columnDefinitions: TableProps<RowDataType>['columnDefinitions'];
    filtering?: boolean;
    pagination?: boolean;
    pageSize?: number;
    sorting?: boolean;
}

const getFilterCounterText = (count = 0) => `${count} ${count === 1 ? 'match' : 'matches'}`;

const EmptyState = ({ title, subtitle, action }: { title: string; subtitle: string; action: ReactNode }) => {
    return (
      <Box textAlign="center" color="inherit">
        <Box variant="strong" textAlign="center" color="inherit">
          {title}
        </Box>
        <Box variant="p" padding={{ bottom: 's' }} color="inherit">
          {subtitle}
        </Box>
        {action}
      </Box>
    );
  };

const DataTable = (props: DataTableProps) => {
    
    const { items, filterProps, actions, filteredItemsCount, paginationProps, collectionProps } = useCollection<RowDataType>(
        props.data,
        {
            filtering: {
                noMatch: (
                    <EmptyState
                        title="No matches"
                        subtitle="We can’t find a match."
                        action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
                    />
                ),
                defaultFilteringText: ""
            },
            pagination: { pageSize: props.pagination ? props.pageSize: Infinity}, // There has to a better way to do this.
            sorting: { defaultState: { sortingColumn: props.columnDefinitions[0] } }
        });

    return (
        <Table<RowDataType>
            {...collectionProps}
            columnDefinitions={props.columnDefinitions}
            sortingDisabled={!props.sorting}
            variant="embedded"
            items={items}
            loadingText="Loading resources"
            stickyHeader
            stripedRows
            filter={props.filtering &&
                <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Search items"
                    countText={getFilterCounterText(filteredItemsCount)}
                />
            }
            header={<Header>{props.title}</Header>}
            pagination={props.pagination && <Pagination {...paginationProps}/>}
        />
    );
}

export default DataTable;