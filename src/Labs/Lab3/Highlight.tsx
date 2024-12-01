import { ReactNode } from "react";
export default function Highlight({ children }: { children: ReactNode }) {
    return (
        <div>
            <span id="wd-highlight" style={{ backgroundColor: "yellow", color: "red" }}>
                {children}
            </span>
            <hr />
        </div>
    );
}
