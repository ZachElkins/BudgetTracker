import React, { useEffect } from "react";
import { Select, SelectProps } from "@cloudscape-design/components";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

interface DropDownSelectProps {
    options: OptionDefinition[];
    defaultOption: OptionDefinition;
    onSelect: (selected: OptionDefinition) => void;
}

const DropDownSelect = (props: DropDownSelectProps) => {
    const options: OptionDefinition[] = props.options;
    const defaultOption: OptionDefinition | null = props.defaultOption;

    const [selectedOption, setSelectedOption] = React.useState<OptionDefinition | null>(defaultOption);
    
    const handleOnChange = (detail: SelectProps.ChangeDetail) => {
        const selected = detail.selectedOption;
        props.onSelect(selected);
        setSelectedOption(detail.selectedOption);
    }

    useEffect(() => {
        setSelectedOption(defaultOption);
    }, [defaultOption]);

    return (
      <Select
        selectedOption={selectedOption}
        onChange={({ detail }) => handleOnChange(detail)}
        options={options}
        placeholder="Choose an option"
        empty="No options"
      />
    );
};

export default DropDownSelect;