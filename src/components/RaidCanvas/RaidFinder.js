import { Component } from "react/cjs/react.production.min";
import getRaidStream from "../getRaidStream";
import RaidStack from "./RaidFinder/RaidStack";

class RaidFinder extends Component {
  constructor(props) {
    super(props);
    this.listReady = false;
    this.dictionary = [];
    this.state = {
      stream: [],
      list : this.props.list,
      selected: this.props.selected,
      stack: []
    };
  }
  async createDictionary(){
    let dictionary = [];
     for(const e of this.state.list){
      dictionary[e.nameJA] = e.nameEN;
    }
    await (this.dictionary = dictionary);
  }

  existKeyInArray(key, arr){
    for(let k of Object.keys(arr)){
      if(k.toString() === key.toString()) return true;
    }
    return false;
  }

  pushToStack(s){
    try {
      const player = s.player;
      const id = s.raid.id;
      const lang = s.raid.lang;
      const level = s.raid.level;
      const message = s.raid.message;
      const createdAt = s.createdAt;
      const name = lang === "ja"? this.dictionary[s.raid.name] : s.raid.name;
      if (name === undefined) throw 'undefinedName';
      let stack = this.state.stack;
      // push the raid into its stack
      if(!this.existKeyInArray(name, stack)) stack[name] = [];
      if(!this.existKeyInArray(level, stack[name])) {
        stack[name][level] = [];
      }
      stack[name][level].unshift({createdAt, player, id, message});
      // put into state
      this.setState({stack: stack});
      //console.log(stack)
    }catch(e){} // TODO: check losses
  }

  areSelectedEqual(){
    const a = this.state.selected;
    const b = this.props.selected;
    //console.log(a)
    if(a === b) return true;
    try {
      let i = 0;
      while (i < a.length){
        if(a[i].name !== b[i].name || a[i].level !== b[i].level) return false;
      }
      return true;
    }catch(e){
      return false;
    }
  }

  getStack(name, level) {
    let stack = this.state.stack;
    if (!this.existKeyInArray(name, stack)) return [];
    if (!this.existKeyInArray(level, stack[name])) return [];
    return stack[name][level];
  }


  async handleListUpdate(list){
    await this.setState({list: list});
  }

  componentDidUpdate(){
    if(this.listReady === false && this.props.isReady === true){
      //this.setState({list: this.props.list})
      this.handleListUpdate(this.props.list).then(()=>{
        this.createDictionary().then(()=>{
          getRaidStream().on('data', raid =>{
            try {
              const json = JSON.parse(raid);
              this.pushToStack(json);
            }catch(e){}
          });
        });
      });
      this.listReady = true;
    }else if(!this.areSelectedEqual()){
      this.setState({selected: this.props.selected});
    }
  }
  render() {
    //console.log(this.state.stack)
    return <div id='raid-finder'>
      <div className='container-fluid'>
        <div className='row'>
          {this.state.selected.map(s =>
              <RaidStack
                  name={s.name}
                  level={s.level}
                  stack={this.getStack(s.name, s.level)}
              />
          )}
        </div>
      </div>
    </div>;
  }
}

export default RaidFinder;
