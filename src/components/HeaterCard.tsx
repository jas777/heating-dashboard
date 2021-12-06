import Heater from "../shared/Heater";
import axios from "axios";
import {useState} from "react";

const HeaterCard = (props: Heater & { className?: string }) => {

    const [isAuto, setAuto] = useState(props.auto);

    const toggle = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/toggle/${props.gpio}`).then(r => {
            setAuto(!isAuto)
        })
    }

    return (
        <button className={`w-48 cursor-pointer select-none flex flex-col shadow-lg ${props.className}`} onClick={toggle}>
            <div className={`flex justify-center w-full heater-mode-info ${isAuto ? 'bg-purple-600' : 'bg-red-600'}`}>
                { isAuto ? 'AUTO' : 'MANUAL' }
            </div>
            <div className='w-full bg-gray-100 text-xl text-center p-2'>
                <p>{props.name}</p>
            </div>
        </button>
    )

}

export default HeaterCard;
