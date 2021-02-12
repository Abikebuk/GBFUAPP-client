import "./App.scss";
import "bootstrap/scss/bootstrap.scss";
import RaidCanvas from "./components/RaidCanvas";
import * as dotenv from 'dotenv';

function App() {
    dotenv.config();
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
