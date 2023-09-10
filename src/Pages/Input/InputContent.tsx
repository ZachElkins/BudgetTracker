import React, { useState } from "react";
import { Autosuggest, Box, Button, Calendar, Container, ContentLayout, DatePicker, Header, Input, SpaceBetween } from "@cloudscape-design/components";
import { updateFile } from "../../Util/FileWriteUtil";
import { Row, RowDataType } from "../../Types/Row";
import BatchInputTable from "../../Components/Tables/BatchInputTable/BatchInputTable";
import { toDataRow } from "../../Util/ProcessDataUtil";

const formatDateForDatePicker = (date: Date): string =>  {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/* TODO:
 *  - Cleaner formatting of inputs
 *  - Decide on Calendar vs DatePicker
 *  - Better currency inputs
 *  - Working dropdowns
 *  - Better data validation
 *  - Inline editing
 *  - Add items in order within the table itself
 */
const InputContent = () => {
    const [date, setDate] = useState<string>(formatDateForDatePicker(new Date(Date.now())));
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [price, setPrice] = useState<string>("0.00");
    const [batch, setBatch] = useState<Row[]>([]);

    const resetInputs = () => {
        setTitle("");
        setCategory("");
        setNote("");
        setPrice("0.00");
    };

    const handleCalendarChange = (date: string): void => setDate(date);
    
    const handleOnTitleChange = (title: string): void => setTitle(title);
    
    const handleOnCategoryChange = (category: string): void => setCategory(category);
    
    const handleOnNoteChange = (note: string): void => setNote(note);

    const handleOnPriceChange = (price: string): void => {
        const regex = /^\d+(\.\d{0,2})?$/;
        if (regex.test(price)) {
            setPrice(price);
        }
    };

    const validateInputs = (): boolean => {
        return date !== "" && title !== "" && category !== "" && note !== "" && price !== "0.00";
    };

    // TODO: Add error handling. 1) Do not reset 2) Show error
    const handleSubmit = (): void => {
        if (!validateInputs()) return;
        const offset: number = new Date().getTimezoneOffset();
        updateFile(toDataRow({
            date: new Date(date).getTime() + offset*60000,
            title: title,
            price: parseFloat(price),
            category: category,
            notes: note
        } as Row));
        resetInputs();
    };

    // TODO: Add error handling. 1) Do not reset 2) Show error
    const handleBatchSubmit = (): void => {
        batch.forEach(row => updateFile(toDataRow(row)));
        setBatch([]);
    };

    const handleAddToBatch = (): void => {
        if (!validateInputs()) return;
        console.log("!: " + parseFloat(price));
        setBatch([...batch, { 
            date: new Date(date).getTime(),
            title: title,
            price: parseFloat(price),
            category: category,
            notes: note
        } as Row]);
        resetInputs();
    };

    const handleTableDelete = (rowsToDelete: RowDataType[]): void => {
        setBatch((prevBatch) => prevBatch.filter(item => !rowsToDelete.includes(item)));
    }

    return (
        <ContentLayout
            header={
                <SpaceBetween size="m">
                    <Header variant="h1">
                        Input
                    </Header>
                </SpaceBetween>
            }
        >
            <SpaceBetween size="s">
                <Container>
                    <SpaceBetween size="m">
                        {/* <Calendar
                            value={date}
                            onChange={({ detail }) => handleCalendarChange(detail.value)}
                        /> */}
                        <SpaceBetween size="m" direction="horizontal">
                            <DatePicker
                                value={date}
                                onChange={({ detail }) => handleCalendarChange(detail.value)}
                            />
                            <Autosuggest
                                onChange={({ detail }) => handleOnTitleChange(detail.value)}
                                value={title}
                                placeholder="Title"
                                options={[]}
                                loadingText="Loading suggestions"
                                statusType="loading"
                            />
                            <Input
                                onChange={({ detail }) => handleOnPriceChange(detail.value.slice(2))}
                                value={`$ ${price}`}
                                inputMode="decimal"
                            />
                            <Autosuggest
                                onChange={({ detail }) => handleOnCategoryChange(detail.value)}
                                value={category}
                                placeholder="Category"
                                options={[]}
                                loadingText="Loading suggestions"
                                statusType="loading"
                            />
                            <Autosuggest
                                onChange={({ detail }) => handleOnNoteChange(detail.value)}
                                value={note}
                                placeholder="Note"
                                options={[]}
                                loadingText="Loading suggestions"
                                statusType="loading"
                            />
                        </SpaceBetween>
                        <SpaceBetween direction="horizontal" alignItems="start" size="m">
                            <Button variant="primary" children="Submit" formAction="submit" onClick={handleSubmit}/>
                            <Button variant="normal" children="Add to batch" formAction="submit" onClick={handleAddToBatch}/>
                        </SpaceBetween>
                    </SpaceBetween>
                </Container>
                <BatchInputTable
                    data={batch}
                    title={"Batch Save"}
                    onSubmit={handleBatchSubmit}
                    onDelete={handleTableDelete}
                />
            </SpaceBetween>
        </ContentLayout>
    );
};

export default InputContent;