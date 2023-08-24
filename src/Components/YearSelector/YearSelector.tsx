import React, { useState } from "react";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { Button, SpaceBetween } from "@cloudscape-design/components";
import useDidMountEffect from "../../Hooks/UseDidMountEffect";
import DropDownSelect from "../DropDownSelect/DropDownSelect";

interface YearSelectorProps {
    years: OptionDefinition[];
    onSelect: (year: OptionDefinition) => void;
    onClick: () => void;
}

const YearSelector = (props: YearSelectorProps) => {

    const yearOptions: OptionDefinition[] = props.years;
    const startYear: OptionDefinition = yearOptions[yearOptions.length-1];
    const [selectedYear, setSelectedYear] = useState<OptionDefinition>(startYear);

    const onSelect = (selected: OptionDefinition) => {
        setSelectedYear(selected);
    };

    useDidMountEffect(() => {
        props.onSelect(selectedYear);
    }, [selectedYear]);

    return (
        <SpaceBetween size="xs">
            <DropDownSelect options={yearOptions} defaultOption={selectedYear} onSelect={onSelect} />
            <Button onClick={props.onClick}>Fetch Data</Button>
        </SpaceBetween>
    );
};

export default YearSelector;
