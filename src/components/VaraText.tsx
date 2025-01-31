import React, { useEffect } from "react";
import Vara from "vara";

type Props = {
    text: string;
    id: string;
};

function VaraText({ text, id }: Props) {
    useEffect(() => {
        const vara = new Vara(
            `#${id}`,
            "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
            [
                {
                    text: text,
                    fontSize: 35,
                    scale: 0.8,
                    strokeWidth: 0.7,
                },
            ],
            {
                forceWidth: true,
                forceHeight: false,
                onReady: ({ container }) => {
                    const svg = container.querySelector("svg");
                    const outerGroup = container.querySelector(".outer");

                    if (svg && outerGroup) {
                        // Get actual rendered dimensions from the outer group
                        const bbox = outerGroup.getBBox();

                        // Set SVG dimensions to match actual content
                        svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
                        svg.style.width = `${bbox.width}px`;
                        svg.style.height = `${bbox.height}px`;

                        // Remove Vara's default size constraints
                        svg.removeAttribute("width");
                        svg.removeAttribute("height");
                    }
                },
            }
        );
    }, [id, text]);

    return <div id={id} style={{ display: 'inline-block' }} />;
}

export default VaraText;
