import "./App.scss";
import useEnv from "./hooks/useEnv";

function App() {
  const {appVersion} = useEnv();
  return (
    <div className="container">
      <h1 className="title">Anedo app</h1>
      <p>Ça arrive fort !</p>
      <p className="version">{appVersion}</p>
    </div>
  );
}

export default App;
