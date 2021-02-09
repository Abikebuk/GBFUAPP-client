import {Component} from "react/cjs/react.production.min";
import axios from "axios";

class RaidList extends Component{

    constructor(props) {
        super(props);
        this.state={
            list : this.props.list
        };
    }

    getList(){
        axios.get('http://localhost:3001/raidsData').then(res => {
            let select = [];
            for(const r of res.data){
                select.push({name: r.nameEN, level: r.level, selected: false});
            }
            this.setState({ list : res.data, select: select});
        });
    }

    getId(raidName){
        return `raid-list-${raidName}-button`;
    }

    listToRender(){
        return this.state.list.map(raid =>
            <li className='raid-list-button'
                id={this.getId(raid.nameEN)}
                name={raid.nameEN}
                level={raid.level}
                // key={`${raid.nameEN}-${raid.level}`}
                onClick={this.props.selectRaid}
                selected={false}
            >
                {raid.nameEN}, {raid.level}
            </li>
        );
    }
    componentDidUpdate(prevProps){
       if(prevProps.list !== this.props.list){
           this.setState({list: this.props.list});
       }
    }

    render(){
        return <div id="raid-list">
            <ul id="raid-list">{this.listToRender()}</ul>
        </div>;
    }

}

export default RaidList;