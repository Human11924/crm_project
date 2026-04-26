import UserProvider from "./context/UserProvider";
function App() {
  return (
    <UserProvider>
      <div className="page">
        <h1>Mini CRM</h1>
      </div>
    </UserProvider>
  );
}

export default App;