import { useEffect } from "react";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import MainComponent from "../components/MainComponent/MainComponent";

export default function Template() {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div style={{ backgroundColor: " var(--bg-fade-color)" }}>
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </div>
    )
}
