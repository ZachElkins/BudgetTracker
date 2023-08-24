import React, { useState } from "react";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import { Container, ContentLayout, Header, SpaceBetween } from "@cloudscape-design/components";
import { getAvailableFiles, readFile } from "../../Util/ReadFile";
import YearSelector from "../../Components/YearSelector/YearSelector";
import { DataRow } from "../../Types/Row";

const YearContent = () => {
    const [year, setYear] = useState<OptionDefinition>();
    const monthsByYearMap: Map<string, OptionDefinition[]> = getAvailableFiles();
    const yearOptions: OptionDefinition[] = [...monthsByYearMap.keys()].map((year: string) => {
        return {label: year, value: year};
    });

    // TODO: There has to be a better way to do this.
    const [chartStatus, setChartStatus] = useState< "finished" | "loading" | undefined>("finished")

    const handleClick = async () => {
        setChartStatus("loading");
        const fetechedData: Map<string, DataRow[]> = new Map<string, DataRow[]>();
        for (const month of monthsByYearMap.get(year!.value!)!) {
            const monthData: DataRow[] = await readFile(month.value!, year!.value!).then((data) => {
                setChartStatus("finished");
                return (data);
            });
            fetechedData.set(month.value!, monthData);
        }
    };

    const handleSelect = (year: OptionDefinition) => {
        setYear(year);
    };

    return (
        <ContentLayout
            header={
                <SpaceBetween size="m">
                    <Header variant="h1">
                        Yearly Spending
                    </Header>
                </SpaceBetween>
            }
        >
            <SpaceBetween size="s">
                <Container>
                    <YearSelector years={yearOptions} onSelect={handleSelect} onClick={handleClick} />
                </Container>
            </SpaceBetween>
        </ContentLayout>
    );
};

export default YearContent;