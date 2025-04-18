import React from "react";

export const Button = (props) => {

    const baseClasses = "text-white text-sm font-semibold px-1 py-1 rounded-lg shadow";
    const colorClasses =
        props.color === "green"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600";


    return (
        <button className={`${baseClasses} ${colorClasses}`} {...props} />
    )
}