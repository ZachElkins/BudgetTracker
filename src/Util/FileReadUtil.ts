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
};

const readFile = async (month: string, year: string): Promise<DataRow[]> => {
    try { 
        const data = await getData(`${pathModule.dirname(app.getAppPath())}/data/${year}/${month}${year.substring(2,4)}.csv`, {});
        // console.log("testGetData: parsed CSV data:", data);
        return data;
    } catch (error: any) {
        console.error("testGetData: An error occurred: ", error.message);
    }

    return [];
};

const getFilesFromPath = (path: string): string[] => {
    return fs.readdirSync(path).filter((file: string) => parseInt(file));
};

const monthToOptionDefenition = (month: string): OptionDefinition => {
    return {value: month, label: Month[parseInt(month)-1]};
};

const getMonthByYearOptions = (): Map<string, OptionDefinition[]> => {
    return new Map(
        [...getAvailableFiles().entries()].map(([year, months]) => [
            year,
            months.map((month) => monthToOptionDefenition(month))
        ])
    );
};

// TODO: Handle files that shouldn't be present, i.e exampl.txt in the same dir as the year folders
const getAvailableFiles = (): Map<string, string[]> => {
    const path = `${pathModule.dirname(app.getAppPath())}/data`;
    const years = getFilesFromPath(path);
    const monthByYearMap: Map<string, string[]> = new Map<string, string[]>();

    years.forEach(year => {
        const months: string[] = getFilesFromPath(pathModule.join(path, year)).map((month: string) => month.substring(0, 2));
        monthByYearMap.set(year, months);
    });

    return monthByYearMap
};

const getAllDataFromYear = async (year: string, months: OptionDefinition[]): Promise<Map<string, DataRow[]>> => {
    const fetechedData: Map<string, DataRow[]> = new Map<string, DataRow[]>();

    for (const month of months) {
        const monthData: DataRow[] = await readFile(month.value!, year).then(data => data);
        fetechedData.set(month.value!, monthData);
    }
    
    return new Promise((resolve, reject) => resolve(fetechedData));
};

export { getAvailableFiles, getMonthByYearOptions, readFile, getAllDataFromYear };