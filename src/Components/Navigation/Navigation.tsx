import React, {useState, useEffect} from "react";
import { SideNavigation } from "@cloudscape-design/components";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeHref, setActiveHref] = React.useState("/");

    useEffect(() => {
        // I don't like this solution, but it works
        setActiveHref(location.pathname);
    }, []);

    return (
        <SideNavigation
            activeHref={activeHref}
            header={{ href: "/", text: "Page" }}
            onFollow={event => {
                if (!event.detail.external) {
                    event.preventDefault();
                    setActiveHref(event.detail.href);
                    navigate(event.detail.href);
                }
            }}
            items={[
                { type: "link", text: "Input", href: "/input" },
                { type: "link", text: "Yearly Spending", href: "/year" },
                { type: "link", text: "Monthly Spending", href: "/month" }
            ]}
        />
    );

}

export default Navigation;