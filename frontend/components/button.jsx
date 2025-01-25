import "../css/Button.css";

function APIButton({ 
  endpoint, 
  method = "GET", 
  body = null, 
  onSuccess, 
  onError, 
  children, 
  buttonStyle = "primary" 
}) {
  async function handleClick() {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.error("Error:", error);
      if (onError) onError(error);
    }
  }

  return (
    <button
      className={`btn ${buttonStyle}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default APIButton;
