import "./App.scss";
import useEnv from "./hooks/useEnv";
import Button from "./components/Button";
import {EyeIcon} from "./Icons";

function App() {
  const {appVersion} = useEnv();
  return (
    <div className="container">
      <h1 className="title">Anedo app</h1>
      <p>Ça arrive fort !</p>
      <div className="buttons">
        <Button variant="primary" size="normal" icon={EyeIcon}>
          Button
        </Button>
        <Button variant="primary" size="small" icon={EyeIcon}>
          Button
        </Button>
        <Button variant="danger" size="normal" icon={EyeIcon}>
          Button
        </Button>
        <Button variant="danger" size="small" icon={EyeIcon}>
          Button
        </Button>
        <Button variant="success" size="normal" icon={EyeIcon}>
          Button
        </Button>
        <Button variant="success" size="small" icon={EyeIcon}>
          Button
        </Button>
        <Button variant="success" size="normal" icon={EyeIcon} disabled>
          Button
        </Button>
        <Button variant="success" size="small" icon={EyeIcon} disabled>
          Button
        </Button>
      </div>
      <p className="version">{appVersion}</p>
    </div>
  );
}

export default App;
