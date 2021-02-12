import { Component } from "react/cjs/react.production.min";
import getRaidStream from "../getRaidStream";
import RaidStack from "./RaidDisplay/RaidStack";

/**
 * Component RaidFinder.
 * Display a selected list of raids with it stack of backup request
 */
class RaidDisplay extends Component {
  constructor(props) {
    super(props);
    // Checks if display is ready to go
    this.listReady = false;
    // Dictionary of raid names EN -> JA
    this.dictionary = [];
    this.state = {
      stream: [],
      list : this.props.list,
      selected: this.props.selected,
      // stack of raid backup request
      stack: []
    };
  }

  /**
   * Create a dictionary of raid names from EN to JA.
   * @returns {Promise<void>}
   */
  async createDictionary(){
    let dictionary = [];
     for(const e of this.state.list){
      dictionary[e.nameJA] = e.nameEN;
    }
    await (this.dictionary = dictionary);
  }

  /**
   * check if a key exists in an array.
   * @param key
   * @param arr
   * @returns {boolean}
   */
  existKeyInArray(key, arr){
    for(let k of Object.keys(arr)){
      if(k.toString() === key.toString()) return true;
    }
    return false;
  }

  /**
   * Push a raid backup request to the stack
   * @param s, an object containing backup request data (comes from the raid stream)
   */
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

  /**
   * check if state.selected === props.selected.
   * @returns {boolean}
   */
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

  /**
   * returns the stack of a specific raid
   * @param name
   * @param level
   * @returns {*[]|*}
   */
  getStack(name, level) {
    let stack = this.state.stack;
    if (!this.existKeyInArray(name, stack)) return [];
    if (!this.existKeyInArray(level, stack[name])) return [];
    return stack[name][level];
  }

  /**
   * update the state.list
   * @param list
   * @returns {Promise<void>}
   */
  async handleListUpdate(list){
    await this.setState({list: list});
  }

  handleStream(){
    getRaidStream().on('data', raid =>{
      try {
        console.log('a')
        const json = JSON.parse(raid);
        this.pushToStack(json);
      }catch(e){}
    }).on('end', ()=> {
      console.log('stream reset')
      this.handleStream();
    });
  }

  componentDidUpdate(){
    // If listReady, update list and create dictionary
    if(this.listReady === false && this.props.isReady === true){
      //this.setState({list: this.props.list})
      this.handleListUpdate(this.props.list).then(()=>{
        this.createDictionary().then(()=>{
          this.handleStream();
        });
      });
      this.listReady = true;
      // Update selected if needed
    }else if(!this.areSelectedEqual()){
      this.setState({selected: this.props.selected});
    }
  }

  render() {
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

export default RaidDisplay;
