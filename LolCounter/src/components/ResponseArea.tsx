import { useState } from "react";
import "./ResponseArea.css";

const ResponseArea = () => {
    const [responseText, setResponseText] = useState("");

    const handleTextAreaChange = (event: any) => {
        setResponseText(event.target.value);
    };

    return (
        <div className="ResponseArea-container">
        <h2>Model Response:</h2>
        <textarea
            value={responseText}
            onChange={handleTextAreaChange}
            placeholder="Model response will appear here..."
        />
    </div>
    )
};

export default ResponseArea;
