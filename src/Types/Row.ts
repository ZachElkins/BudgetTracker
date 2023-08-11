type DataRow = {
    Date: string,
    Title: string,
    Price: string,
    Category: string,
    Notes: string
}

type Row = {
    date: number,
    title: string,
    price: number,
    category: string,
    notes: string
}

type CategoryRow = {
    category: string,
    sum: number,
    quantity: number
}

type RowDataType = Row | CategoryRow;


export type {RowDataType, CategoryRow, Row, DataRow };