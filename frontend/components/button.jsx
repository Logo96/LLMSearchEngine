import "../css/Button.css";
function Button({  
  children, 
  buttonStyle = "primary",
  onClick,
  className = "", 
}) {
  return (
    <button
      className={`btn ${buttonStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button;
