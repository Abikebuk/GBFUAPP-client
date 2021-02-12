import "./App.scss";
import "bootstrap/scss/bootstrap.scss";
import RaidCanvas from "./components/RaidCanvas";


function App() {
    console.log(process.env);
  return (
    <div className="App">
        <div className='container-fluid'>
            <header className="App-header row no-gutters">
                <div id='app-name'><span>GBFTools</span></div>
            </header>
            <RaidCanvas/>
        </div>

    </div>
  );
}

export default App;
