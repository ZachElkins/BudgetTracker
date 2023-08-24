import React, { useState } from "react";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { Button, SpaceBetween } from "@cloudscape-design/components";
import useDidMountEffect from "../../Hooks/UseDidMountEffect";
import DropDownSelect from "../DropDownSelect/DropDownSelect";

interface MonthSelectorProps {
    monthsByYearMap: Map<string, OptionDefinition[]>;
    onSelect: (year: OptionDefinition, month: OptionDefinition) => void;
    onClick: () => void;
}

const MonthSelector = (props: MonthSelectorProps) => {

    const monthsByYearMap: Map<string, OptionDefinition[]> = props.monthsByYearMap;
    const yearOptions: OptionDefinition[] = [...monthsByYearMap.keys()].map((year: string) => {
        return {label: year, value: year};
    });
    const startYear: OptionDefinition = yearOptions[yearOptions.length-1];

    const [monthOptions, setMonthOptions] = useState<OptionDefinition[]>(monthsByYearMap.get(startYear.label!)!)
    const [selectedMonth, setSelectedMonth] = useState<OptionDefinition>(monthOptions[monthOptions.length-1]);
    const [selectedYear, setSelectedYear] = useState<OptionDefinition>(startYear);

    const yearDropdownSelect = (selected: OptionDefinition) => {
        const newMonthOptions: OptionDefinition[] = monthsByYearMap.get(selected.label!)!;
        const availableMonths: string[] = newMonthOptions.map((monthOption: OptionDefinition) => monthOption.value!);

        setMonthOptions(newMonthOptions);
        setSelectedYear(selected);
        
        if (!availableMonths.includes(selectedMonth.value!)) setSelectedMonth(newMonthOptions[newMonthOptions.length-1]);
    };
    
    const monthDropdownSelect = (selected: OptionDefinition) => {
        setSelectedMonth(selected);
    };

    useDidMountEffect(() => {
        props.onSelect(selectedYear, selectedMonth);
    }, [selectedMonth, selectedYear]);

    return (
        <SpaceBetween size="xs">
            <DropDownSelect options={yearOptions} defaultOption={selectedYear} onSelect={yearDropdownSelect} />
            <DropDownSelect options={monthOptions}  defaultOption={selectedMonth} onSelect={monthDropdownSelect} />
            <Button onClick={props.onClick}>Fetch Data</Button>
        </SpaceBetween>
    );
};

export default MonthSelector;
