import "./App.scss";
import "bootstrap/scss/bootstrap.scss";
import RaidCanvas from "./components/RaidCanvas";
import CONFIG from "./config";


function App() {
    console.log(`proces : ${process.env.GBFUAPP_SERVER_HOSTNAME}`);
    console.log(`config : ${CONFIG.server_hostname}`);
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
