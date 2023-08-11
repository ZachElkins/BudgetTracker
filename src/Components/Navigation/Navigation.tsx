import React from "react";
import { SideNavigation } from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const [activeHref, setActiveHref] = React.useState("");
    const navigate = useNavigate();

    return (
        <SideNavigation
            activeHref={activeHref}
            header={{ href: "/", text: "Page" }}
            onFollow={event => {
                if (!event.detail.external) {
                    event.preventDefault();
                    // TODO: useNavigation rerenders the page, so the activateHref state gets reset to the default value
                    setActiveHref(event.detail.href);
                    navigate(event.detail.href);
                }
            }}
            items={[
                { type: "link", text: "Yearly Spending", href: "/year" },
                { type: "link", text: "Monthly Spending", href: "/month" }
            ]}
        />
    );

}

export default Navigation;