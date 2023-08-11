import React from "react";
import { AppLayout } from "@cloudscape-design/components";
import Navigation from "../../Components/Navigation/Navigation"
import MonthContent from "./MonthContent";

const MonthPage = () => {
    return (
        <AppLayout
            content={<MonthContent />}
            navigation={<Navigation />}
        />
    )
}

export default MonthPage;