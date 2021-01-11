import DateTable from './date-table';
import {useState, useEffect} from 'react';

const mouthList = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Decembre"];
const progresWidth = {
    width: "0%"
}
const tmzone = {
    backgroundColor: "rgba(0, 0, 0, 0.03)"
}

let title = "Sélectionnez la date et l'heure";

function isDateOk(condition){
    if(condition) return <div className="container time-picker d-flex flex-column" data-pg-name="time-picker" styles={tmzone}></div>
    else return <div />
}
function timeZone(condition,listData){
    if(condition) return <div data-pg-name="time-zone-container" className="d-flex flex-column" data-pg-collapsed>
                            <select className="custom-select" data-pg-collapsed> 
                                {listData}                         
                            </select> 
                        </div>
    else return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
}
function setDate(offset,type){
    let now = new Date();
    let result;
    if (now.getMonth() == 11) {
        result = new Date(now.getFullYear() + 1, 0, 1);
    } else {
        result = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    }

    if(type == "m") result = result.getMonth();
    else if(type == "y") result = result.getFullYear();
    else result = 0;
    return result;
}

export default function Layout(){
    let curentMouthStat = 0;
    const [mois, setMois] = useState(mouthList[setDate(0,"m")]);
    const [annee, setAnne] = useState(setDate(0,"y")+"");
    const [dateTimeOk , setDateState] = useState(false);
    const [timeZoneList, setTimeListe] = useState([]);
    const [timeZoneLoaded, setTimezoneLoaded] = useState(false);

    let listOptions = timeZoneList.map((itm,i)=>{
        var date = new Date(itm.timestamp * 1000);
        return <option value={i} key={i}>{itm.countryName+" ("+date.getHours()+":"+date.getMinutes()+")"}</option>
    });
    
    function setMouthe(mouvement){
        if(mouvement == "up"){
            if(curentMouthStat < 2) {
                curentMouthStat = curentMouthStat+1;
                setMois(mouthList[setDate(curentMouthStat,"m")]);
                console.log("offset mouth up",curentMouthStat);
            }
            else curentMouthStat = curentMouthStat;
        }
        if(mouvement == "down"){
            if(curentMouthStat > 0) {
                curentMouthStat = curentMouthStat-1;
                setMois(mouthList[setDate(curentMouthStat,"m")]);
                console.log("offset mouth down",curentMouthStat);
            }
            else curentMouthStat = curentMouthStat;
        }
    }

    useEffect(() => {
        fetch("http://api.timezonedb.com/v2.1/list-time-zone?key=J4L7Q27D1F2N&format=json")
          .then(res => res.json())
          .then(
            (result) => {
                setTimezoneLoaded(true);
                setTimeListe(result.zones);
            },
            (error) => {
                setTimezoneLoaded(true);
                alert("Erreur de chargement TimeZone: "+ error);
            }
          )
      }, []);

    return (
        <div data-pg-name="maincontainer" className="base-main-container d-flex flex-column justify-content-center align-items-center" data-pg-collapsed>
        <div data-pg-name="rdv-container" className="rdv-container d-flex d-sm-flex d-md-flex flex-sm-column flex-md-row flex-column" data-pg-collapsed>
            <div data-pg-name="date-picker" className="d-flex flex-column date-picker align-items-center justify-content-center">
                <div className="progres-container" data-pg-name="progres-cont" data-pg-collapsed>
                    <div data-pg-name="bar" className="p-bar" styles={progresWidth}></div>
                </div>
                <div className="container header-container" data-pg-name="header-container" data-pg-collapsed>
                    <p className="header-title">{title}</p>
                </div>
                <div className="container d-flex flex-column" data-pg-name="mainbody" data-pg-collapsed>
                    <div className="container mouth-selec-container d-flex flex-row justify-content-around" data-pg-name="mouth-selector-container" data-pg-collapsed>
                        <div className="container" data-pg-name="mouth">
                            <p className="mouth">{mois} {annee}</p>
                        </div>
                        <div className="container d-flex flex-row justify-content-around" data-pg-name="arrows">
                            <div className="arowdiv" onClick={()=>{setMouthe("down")}}><img src="/leftarrow.svg" alt="" className="arow-left"/></div>
                            <div className="arowdiv" onClick={()=>{setMouthe("up")}}><img src="/rightarrow.svg" alt="" className="arow-right"/></div>
                        </div>
                    </div>
                    <div data-pg-name="date-p-container" className="date-p-container" data-pg-collapsed>
                        <DateTable></DateTable>
                    </div>
                    {timeZone(timeZoneLoaded,listOptions)}
                </div>
            </div>
            {isDateOk(dateTimeOk)}
        </div>
    </div>
    )
}