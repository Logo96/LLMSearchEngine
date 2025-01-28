export const Card = ({ children }) => {
  return (
    <div className="border rounded-2xl shadow-lg p-4 bg-white">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};