import React from "react";
import { SideNavigation } from "@cloudscape-design/components";

const Navigation = () => {
    const [activeHref, setActiveHref] = React.useState("#/page1");

    return (
        <SideNavigation
            activeHref={activeHref}
            header={{ href: "#/", text: "Service name" }}
            onFollow={event => {
                if (!event.detail.external) {
                    event.preventDefault();
                    setActiveHref(event.detail.href);
                }
            }}
            items={[
                { type: "link", text: "temp", href: "#/temp" },
                { type: "link", text: "temp2", href: "#/temp2" },
            ]}
        />
    );

}

export default Navigation;