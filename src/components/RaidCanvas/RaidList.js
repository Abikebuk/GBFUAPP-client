import {Component} from "react/cjs/react.production.min";

/**
 * Component RaidList.
 * Manages the display of selected raids.
 */
class RaidList extends Component{
    /**
     * constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state={
            list : this.props.list
        };
    }

    /**
     * Returns id from a raid name
     * @param raidName
     * @returns {string}
     */
    getId(raidName){
        return `raid-list-${raidName}-button`;
    }

    /**
     * Creates the list to render.
     * @returns {*}
     */
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
        // update list only once
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