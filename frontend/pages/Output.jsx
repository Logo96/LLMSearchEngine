import ToggleLayouts from "../components/ToggleLayouts";
import Backdrop from "../components/backdrop.jsx";
import "../css/Loading.css"
import { CircularProgress } from "@mui/material";

function Output({ apiResponse, loading }) {
  if (loading) {
    return (
      <Backdrop>
        <div className="loading-container">
          <CircularProgress></CircularProgress>
          <h1 className="Loading-text">Loading...</h1>
        </div>
      </Backdrop>
    );
  }
  if (!apiResponse) {
    return (
      <Backdrop>
        <div className="loading-container">
          <p className="loading-text">There was an error with the APIRequest</p>
        </div>
      </Backdrop>
    );
  }
  return (
    <Backdrop>
      <ToggleLayouts apiResponse={apiResponse} />
    </Backdrop>
  );
}

export default Output;
