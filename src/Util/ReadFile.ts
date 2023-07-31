import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { DataRow } from "../Types/Row";

const fs = window.require('fs');
const pathModule = window.require('path');
const fastCsv = window.require("fast-csv");
const { app } = window.require('@electron/remote');

enum Month { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" }

const getData = (file: string, type: object): Promise<DataRow[]>  => {
    const data: DataRow[] = [];

    const options = {
        objectMode: true,
        delimiter: ",",
        quote: "string",
        headers: true,
        renameHeaders: false,
        strictColumnHandling: true
    };

    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(fastCsv.parse(options))
            .on("error", (error: any) => {
                console.log(error);
            })
            .on("data", (row: any) => {
                data.push(row);
            })
            .on('end', () => {
                resolve(data);
            });
    });
}

const readFile = async (month: string, year: string): Promise<DataRow[]> => {
    try { 
        const data = await getData(`${pathModule.dirname(app.getAppPath())}/data/${year}/${month}${year.substring(2,4)}.csv`, {});
        return data;
        console.log("testGetData: parsed CSV data:", data);
    } catch (error: any) {
        console.error("testGetData: An error occurred: ", error.message);
    }

    return [];
}

const getFiles = (path: string): string[] => {
    return fs.readdirSync(path).filter((file: string) => parseInt(file));
}

// const getAvailableFiles = (path: string): Map<string, OptionDefinition[]> => {
const getAvailableFiles = (): Map<string, OptionDefinition[]> => {
    const path = `${pathModule.dirname(app.getAppPath())}/data`;
    const monthByYearMap: Map<string, OptionDefinition[]> = new Map<string, OptionDefinition[]>();
 
    for (const year of getFiles(path)) {
        const months: string[] = getFiles(pathModule.join(path, year)).map((month: string) => month.substring(0, 2));
        monthByYearMap.set(year, months.map((month: string) => { return {value: month, label: Month[parseInt(month)-1]} }));
    }

    return monthByYearMap;
}

export { getAvailableFiles, readFile };