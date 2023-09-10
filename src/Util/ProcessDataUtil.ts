import { CategoryRow, DataRow, Row } from '../Types/Row';
import { Coordinate, Range } from '../Types/Pair';

const floatToDollarAmount = (num: number): string => {
	const wholeNumber: number = Math.trunc(Math.floor(num));
	const decimalString: string = (num - wholeNumber)
		.toPrecision(2)
		.padEnd(4, '0')
		.split('.')[1]; // Why is it pad 4??
	return `$${wholeNumber.toString()}.${decimalString}`;
};

const toEpoch = (date: Date): number => {
	return Math.floor(date.getTime());
};

const toRow = (data: DataRow): Row => {
	return {
		date: toEpoch(new Date(data.Date)),
		title: data.Title,
		price: parseFloat(data.Price.substring(1, data.Price.length - 1)),
		category: data.Category,
		notes: data.Notes,
	} as Row;
};

const toDataRow = (row: Row): DataRow => {
	const formatDate = (date: Date): string => {
		console.log(`Formatting ${date}`);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};
	console.log(formatDate(new Date(row.date)));
	return {
		Date: formatDate(new Date(row.date)),
		Title: row.title,
		Price: floatToDollarAmount(row.price),
		Category: row.category,
		Notes: row.notes
	}
}

const createListOfEpochSeconds = (data: Row[]): number[] => {
	const firstDayFromData: Date = new Date(data[0].date);
	const lastDayFromData: Date = new Date(data[data.length-1].date);
	const year: number = firstDayFromData.getFullYear();
	const startMonth: number = firstDayFromData.getMonth();
	const endMonth: number = lastDayFromData.getMonth();

	const epochSecondsList: number[] = [];
	const currentDate: Date = new Date(year, startMonth, 1);
	const lastDate: Date = new Date(year, endMonth + 1, 0);

	while (currentDate <= lastDate) {
		epochSecondsList.push(currentDate.getTime());
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return epochSecondsList;
};

const createPairsWithSum = (data: Row[]): Coordinate[] => {
	const epochSecondsList = createListOfEpochSeconds(data);
	const pairs: Coordinate[] = [];

	for (const epochSeconds of epochSecondsList) {
		const sumPrice = data
			.filter((row: Row) => row.date === epochSeconds)
			.reduce((acc: number, row: Row) => acc + row.price, 0);
		pairs.push({ x: epochSeconds, y: sumPrice });
	}

	return pairs;
};

const getRunningTotal = (data: Coordinate[]): Coordinate[] => {
	const dataPoints: Coordinate[] = [];
	let sum = 0;
	for (const point of data) {
		sum += point.y;
		dataPoints.push({ ...point, y: sum });
	}
	return dataPoints;
};

const calculateDataByCategory = (data: Row[]): CategoryRow[] => {
	const categoryMap: Map<string, CategoryRow> = new Map<
		string,
		CategoryRow
	>();

	for (const row of data) {
		if (!categoryMap.has(row.category)) {
			categoryMap.set(row.category, {
				category: row.category,
				sum: row.price,
				quantity: 1,
			});
			continue;
		}

		const categoryData: CategoryRow = categoryMap.get(row.category)!;
		categoryMap.set(row.category, {
			...categoryData,
			sum: categoryData.sum + row.price,
			quantity: ++categoryData.quantity,
		});
	}

	return [...categoryMap].map((entry) => entry[1]);
};

const getRange = (data: Coordinate[]): Range => {
	const values: number[] = data.map(({ y }) => y);
	return {
		max: Math.max(...values),
		min: Math.min(...values),
	};
};

// Make this an actual type :/
interface TMP {
	title: string;
	type: string;
	data: Coordinate[];
}

const buildStackedDataFromCategories = (data: Row[]): TMP[] => {
	const categoryMap: Map<string, TMP> = new Map<string, TMP>();

	for (const row of data) {
		if (!categoryMap.has(row.category)) {
			categoryMap.set(row.category, {
				title: row.category,
				type: 'bar',
				data: [{ x: row.date, y: row.price }],
			});
			continue;
		}

		const categoryData: TMP = categoryMap.get(row.category)!;
		const newDataPoint: Coordinate = { x: row.date, y: row.price };
		const idx = categoryData.data.map(({ x }) => x).indexOf(newDataPoint.x);
		if (idx >= 0) {
			const updatedData: Coordinate[] = categoryData.data;
			updatedData[idx] = {
				x: updatedData[idx].x,
				y: updatedData[idx].y + newDataPoint.y,
			};
			categoryMap.set(row.category, {
				...categoryData,
				data: updatedData,
			});
			continue;
		}
		categoryMap.set(row.category, {
			...categoryData,
			data: [...categoryData.data, newDataPoint],
		});
	}

	return [...categoryMap].map((entry) => entry[1]);
};

const generatePieChartData = (data: Row[]): {title: string, value: number}[] => {
	const pieChartData: {title: string, value: number}[] = 
	calculateDataByCategory(data).map(({category, sum}) => {
		return { title: category, value: sum}
	});

	return pieChartData;
}

export {
	toRow,
	toDataRow,
	createPairsWithSum,
	createListOfEpochSeconds,
	calculateDataByCategory,
	floatToDollarAmount,
	buildStackedDataFromCategories,
	getRange,
	getRunningTotal,
	generatePieChartData
};
