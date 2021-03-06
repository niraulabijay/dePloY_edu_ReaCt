import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../components/Allpage/Navbar";
import PreparationBanner from "../components/Preparation/PrepartionBanner";
import PreparationContent from "../components/Preparation/PreparationContent";
import Footer from "../components/Allpage/Footer";
import Question from "../components/Homepage/Question";


export default function Preparation(){
    return(
        <React.Fragment>
            <PreparationBanner />
            <PreparationContent />
            <Question />
            <Footer />
        </React.Fragment>
    )
}