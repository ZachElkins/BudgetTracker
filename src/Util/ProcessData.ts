import { CategoryRow, DataRow, Pair, Row } from "../Types/Row";


const floatToDollarAmount = (num: number): string => {
    const wholeNumber: number = Math.trunc(Math.floor(num));
    const decimalString: string = (num-wholeNumber).toPrecision(2).padEnd(4, '0').split('.')[1]; // Why is it pad 4??
    return `$${wholeNumber.toString()}.${decimalString}`;
}


const toEpoch = (date: Date): number => {
    return Math.floor(date.getTime());
}

const toRow = (data: DataRow): Row => {
    return {
        date: toEpoch(new Date(data.Date)),
        title: data.Title,
        price: parseFloat(data.Price.substring(1, data.Price.length-1)),
        category: data.Category,
        notes: data.Notes,
    } as Row;
}

function createListOfEpochSeconds(data: Row[]): number[] {
    const dayFromData: Date = new Date(data[0].date);
    const year: number = dayFromData.getFullYear();
    const month: number = dayFromData.getMonth();

    const epochSecondsList: number[] = [];
    const currentDate: Date = new Date(year, month, 1); // Start from the first day of the month
    const lastDate: Date = new Date(year, month+1, 0); // End at the last day of the month

    while (currentDate <= lastDate) {
        epochSecondsList.push(currentDate.getTime()); // Convert milliseconds to seconds
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    
    return epochSecondsList;
}

const createPairsWithSum = (data: Row[]): Pair[] => {
    const epochSecondsList = createListOfEpochSeconds(data);
    const pairs: Pair[] = [];

    for (const epochSeconds of epochSecondsList) {
        const sumPrice = data
            .filter((row: Row) => row.date === epochSeconds)
            .reduce((acc: number, row: Row) => acc + row.price, 0);
        pairs.push({ x: epochSeconds, y: sumPrice } as Pair);
    }

    return pairs;
}

const calculateDataByCategory = (data: Row[]): CategoryRow[] => {
    const categoryMap: Map<string, CategoryRow> = new Map<string, CategoryRow>();

    for(const row of data) {
        if (!categoryMap.has(row.category)) {
            categoryMap.set(row.category, {
                category: row.category,
                sum: row.price,
                quantity: 1
            });
            continue;
        }
        
        const categoryData: CategoryRow = categoryMap.get(row.category)!;
        categoryMap.set(row.category, {
            ...categoryData,
            sum: categoryData.sum+row.price,
            quantity: ++categoryData.quantity
        });
    }

    return [...categoryMap].map(entry => entry[1]);
}

export { toRow, createPairsWithSum, calculateDataByCategory, floatToDollarAmount };

