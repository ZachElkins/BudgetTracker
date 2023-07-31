import React from "react";
import { AppLayout } from "@cloudscape-design/components";
import Navigation from "../../Components/Navigation/Navigation"
import LandingContent from "./LandingContent";

const LandingPage = () => {
    return (
        <AppLayout
            content={<LandingContent />}
            navigation={<Navigation />}
        />
    )
}

export default LandingPage;