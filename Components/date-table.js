import {useState} from 'react';

function initLists(){
    let result = []
    for (let i = 0; i < 5; i++) {
        let row = []
        for (let y = 0; y < 7; y++) {
            row.push({value:"", state:0, cClass:"cellStyle-vide"});
        }
        result.push(row);
    }
    return result;
}
export default function DateTable(props){
    const [tableListe, setTableList] = useState(initLists());
    function setActiveCell(rowId,colId,clickable){
        if(clickable){
            let curentList = tableListe;
            let classIn = curentList[rowId][colId].value == ""? "cellStyle-vide":"cellStyle";
            curentList[rowId][colId].cClass = classIn;
            setTableList(curentList);
        }
    }
    function setTable(tListe){
        return tListe.map((itm,i)=>{
            return <tr key={i}>
                        {itm.map((citm,y)=>{
                            return <td key={y} className="cell-box"><div onClick={setActiveCell(i,y,citm.value != "")} className={citm.cClass}>{citm.value}</div></td>
                        })}
                   </tr>
        })
    }
    return(
        <table className="table table-sm text-center borderless" data-pg-collapsed> 
            <thead> 
                <tr> 
                    <th>Lun</th> 
                    <th>Mar</th> 
                    <th>Mer</th> 
                    <th>Jeu</th> 
                    <th>Ven</th>
                    <th>Sam</th>
                    <th>dim</th>
                </tr>                             
            </thead>                         
            <tbody> 
                {setTable(tableListe)}
            </tbody>                         
        </table>
    )
}