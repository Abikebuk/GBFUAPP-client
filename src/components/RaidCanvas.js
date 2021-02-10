import RaidFinder from "./RaidCanvas/RaidFinder";
import RaidList from "./RaidCanvas/RaidList";
import getRaidsData from "./getRaidsData";

const {Component} = require("react");

class RaidCanvas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            raidsData: [],
            raidsSelected: [],
            raidsDataFetched: false
        };
        this.selectRaid = this.selectRaid.bind(this);
    }

    async init(){
        await this.setState({
            // adds "selected" element to the Data
            raidsData : (await getRaidsData()).map(r => {r.selected = false; return r;}),
        });
        this.setState({raidsDataFetched: true});
    }

    selectRaid(e){
        const name = e.target.getAttribute("name");
        const level = e.target.getAttribute("level");
        // Find index of selected raid
        let index = -1;
        let i = 0;
        const length = this.state.raidsData.length;
        while (index === -1 && i < length){
            const s = this.state.raidsData[i];
            if(s.nameEN === name && s.level === parseInt(level)) index = i;
            i++;
        }
        i--;
        if(index === -1) console.log(`ERROR on raid selected [ index : ${i}, name : ${name}, level : ${level} ]`);
        // Change it to the opposite (true => false or false => true)
        let res = this.state.raidsData;
        res[i].selected = res[i].selected === false;
        this.setState({select: res});
        // handle changes
        this.updateSelectedRaids(name, level);
        // add class selected to the element
        if (e.target.className.includes('selected'))
            e.target.className = e.target.className.replace(' selected', '');
        else e.target.className += " selected";
    }

    getIndexOfSelected(name, level){
        let index = -1;
        let i = 0;
        const selected = this.state.raidsSelected;
        while (index === -1 && i < selected.length){
            const sName = selected[i].name;
            const sLevel = selected[i].level;
            if (sName === name && sLevel === level) index = i;
            i++;
        }
        return index;
    }

    updateSelectedRaids(name, level){
        level = parseInt(level);
        let res = this.state.raidsSelected;
        const indexOfSelected = this.getIndexOfSelected(name,level);
        for(const d of this.state.raidsData){
            if(d.nameEN === name && d.level === level){
                // /!\ d.selected is inverted when called
                if(!d.selected) res.splice(indexOfSelected, 1);
                else  res.push({name, level});
            }
        }
        this.setState({raidsSelected: res});
    }

    componentDidMount(){
        this.init().then(() => {console.log('done');});
    }

    render(){
        return <div id="raid-canvas" className='row no-gutters'>
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div id='raid-finder-wrapper' className="col">
                            <RaidFinder
                                list={this.state.raidsData}
                                isReady={this.state.raidsDataFetched}
                                selected={this.state.raidsSelected}
                            />
                        </div>
                        <div id='raid-list-wrapper' className="col-auto">
                            <RaidList
                                list={this.state.raidsData}
                                selectRaid={this.selectRaid}
                            />
                        </div>
                    </div>
            </div>
        </div>;
    }
}

export default RaidCanvas;