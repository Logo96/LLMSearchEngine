import "../css/ComparisonContainer.css"
const ComparisonContainer = ({ leftComponent, rightComponent }) => {
    return (
      <div className="side-by-side-container">
        <div className="left-component">
          {leftComponent}
        </div>
        <div className="right-component">
          {rightComponent}
        </div>
      </div>
    );
  };
  export default ComparisonContainer;
  