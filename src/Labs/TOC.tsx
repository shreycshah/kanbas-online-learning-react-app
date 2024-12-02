import { useLocation } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/shreycshah/kanbas-online-learning-react-app" className="nav-link">
          React Web App GitHub
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/shreycshah/kanbas-online-learning-server" className="nav-link">
          Node Server App GitHub
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://kanbas-node-server-app-y0ea.onrender.com/" className="nav-link">
          Render Server
        </a>
      </li>
    </ul>
  );
}


