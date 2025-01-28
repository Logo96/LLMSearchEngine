import "../css/NavigationBar.css"
const NavigationBar = ({ setIsHome }) => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button
            className="navbar-link"
            onClick={(e) => {
              e.preventDefault();
              setIsHome(true);
            }}
          >
            Home
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-link"
            onClick={() => window.open("https://github.com/Logo96/LLMSearchEngine", "_blank")}
          >
            GitHub
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
