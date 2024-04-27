import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>Not Found Page</h1>
            <p>This is what you gonna see when you lost</p>
            <Link to="/">Home from Link</Link><br/>
            <a href="/">Home from A</a>
        </div>
    );
}