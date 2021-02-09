import axios from "axios";

async function getRaidsData() {
    return await axios.get('http://localhost:3001/raidsData')
        .then(res => {
            /*
             let select = [];
            for(const r of res.data){
                select.push({name: r.nameEN, level: r.level, selected: false});
            }
            this.setState({ list : res.data, select: select});
             */
            return res.data;
        });
    //console.log(await res);

}
export default getRaidsData;