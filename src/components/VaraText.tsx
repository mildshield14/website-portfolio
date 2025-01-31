import { useEffect } from "react";
import Vara from "vara";

type Props = {
    text: string;
    id: string;
};

interface VaraOnReadyEvent {
    container: HTMLElement;
}

function VaraText({ text, id }: Props) {
    useEffect(() => {
        new Vara(
            `#${id}`,
            "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
            [
                {
                    text,
                    fontSize: 35,
                    strokeWidth: 0.7,
                },
            ],
            {
                forceHeight: false,
                forceWidth: true,
                onReady: ({ container }: VaraOnReadyEvent) => {
                    const svg = container.querySelector("svg") as SVGSVGElement | null;
                    const outerGroup = container.querySelector(".outer") as SVGGraphicsElement | null;

                    if (svg && outerGroup) {
                        // Get the bounding box of the outer group
                        const bbox = outerGroup.getBBox();

                        // Set the viewBox based on the actual rendered content
                        svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

                        // Set the SVG's inline styles (width/height) to the content's size
                        svg.style.width = `${bbox.width}px`;
                        svg.style.height = `${bbox.height}px`;

                        // Remove any inline attributes that might force a different size
                        svg.removeAttribute("width");
                        svg.removeAttribute("height");
                    }
                },
            } as any
        );
    }, [id, text]);

    return <div id={id} style={{ display: "inline-block" }} />;
}

export default VaraText;
