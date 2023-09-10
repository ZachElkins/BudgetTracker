import { DataRow } from "../Types/Row";
import { getAvailableFiles } from "./FileReadUtil";

const fs = window.require('fs');
const pathModule = window.require('path');
const { app } = window.require('@electron/remote');

const updateFile = (item: DataRow) => {
    const date: Date = new Date(item.Date);
    const year: string = date.getFullYear().toString();
    const month: string = (date.getMonth()+1).toString().padStart(2, '0');
    const monthByYearMap: Map<string, string[]> = getAvailableFiles();
    
    if (!(Array.from(monthByYearMap.keys()).includes(year)
        && monthByYearMap.get(year)?.includes(month))) {
        createFile(year, month);
    }

    addEntryToFile(year, month, item);
};

const generatePath = (year: string, month: string) => {
    return `${pathModule.dirname(app.getAppPath())}/data/${year}/${month}${year.slice(2)}.csv`;
};

const createFile = (year: string, month: string) => {
    const path = generatePath(year, month);
    const payload = "Date,Title,Price,Category,Notes";
    writeToFile(
        path, 
        payload,
        "w",
        () => console.log(`Sucessfull Created a new file. Wrote ${payload} to ${path}.`),
        (err: string) => console.log(`Error: ${err}`)
    );
};

const dataRowToString = (dataRow: DataRow) => {
    return `\n${dataRow.Date},${dataRow.Title},${dataRow.Price},${dataRow.Category},${dataRow.Notes}`;
};

const addEntryToFile = (year: string, month: string, item: DataRow) => {
    const path = generatePath(year, month); 
    const payload: string = dataRowToString(item);
    writeToFile(
        path, 
        payload,
        "a",
        () => console.log(`Sucessfull appeneded ${payload} to ${path}.`),
        (err: string) => console.log(`Error: ${err}`)
    );
};

const writeToFile = (path: string, payload: string, flag: "w" | "a", successCallback?: () => void, errorCallback?: (err: string) => void) => {
    fs.writeFile(
        path,
        payload,
        {encoding: "utf8", flag: flag, mode: 0o666},
        (err?: string) => err ? errorCallback?.(err) : successCallback?.()
    );
}

export { updateFile };