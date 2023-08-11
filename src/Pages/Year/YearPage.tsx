import React from "react";
import { AppLayout } from "@cloudscape-design/components";
import Navigation from "../../Components/Navigation/Navigation"
import YearContent from "./YearContent";

const YearPage = () => {
    return (
        <AppLayout
            content={<YearContent />}
            navigation={<Navigation />}
        />
    )
}

export default YearPage;