export default function AuthWrapper({ children }) {

  return (
    <div className="Logindiv">
      <div className="div_2 note yellow">
        <i className="pin"></i>
        {children}
      </div>
    </div>
  );
}
