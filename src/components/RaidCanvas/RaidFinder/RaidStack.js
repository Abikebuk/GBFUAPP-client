import {Component} from "react";

class RaidStack extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            level: '',
            stack : [],
        };
        this.isReady = false;
    }

    componentDidUpdate(){
        if(!this.isReady && this.state.name !== this.props.name && this.state.level !== this.props.level){
            this.setState({
                name: this.props.name,
                level: this.props.level,
                stack: this.props.stack
            });
            this.isReady = true;
        }
    }
    render(){
        return <div className='raid-stack'>
            <div className='raid-stack-header'>{this.state.name} {this.state.level}</div>
            <ul className='raid-stack-button-list'>
                {this.state.stack.map(s =>
                    <li key={s.length} className='raid-stack-button'>
                        <div className="container-fluid">
                            <div className="row no-gutters">
                                <div className="col">
                                    <div className='raid-stack-button-player'>{s.player}</div>
                                    <div className='raid-stack-button-id'>{s.id}</div>
                                </div>
                                <div className="col">
                                    <div className='raid-stack-button-message'>{s.message}</div>
                                </div>
                            </div>
                        </div>

                    </li>
                )}
            </ul>
        </div>;
    }

}
export default RaidStack;
