import React from "react";
import { AppLayout } from "@cloudscape-design/components";
import Navigation from "../../Components/Navigation/Navigation"
import YearContent from "./InputContent";

const InputPage = () => {
    return (
        <AppLayout
            content={<YearContent />}
            navigation={<Navigation />}
        />
    )
}

export default InputPage;