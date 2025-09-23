import React from "react";
import { Education, Career } from "../config/types/interface";

export const About: React.FC = () => {
    const [selected, setSelected] = React.useState("about");
    


    return (
        <div className="flex justify-center items-center">
            <h1>about page</h1>
        </div>
    );
};
