import './App.css';
import {useAxios} from "use-axios-client";
import ConfigDTO from "./shared/ConfigDTO";
import HeaterCard from "./components/HeaterCard";
import styled from "styled-components";

function App() {

    const { data, loading } = useAxios<ConfigDTO>({
        url: `${process.env.REACT_APP_BASE_URL}/config`
    });

    const { data: heatersInLoop } = useAxios<{ in_loop: number[] }>({
        url: `${process.env.REACT_APP_BASE_URL}/inloop`
    });

    const StyledHeater = styled(HeaterCard)`
      //width: fit-content;
      margin: 1em 0 1em 2em;
    `

    let toDisplay = (!data || loading) ? <li><p className='ml-8'>Pobieranie danych...</p></li> : data.heaters.map(h => {
        return <StyledHeater name={h.name} active={h.active} gpio={h.gpio} auto={!!heatersInLoop?.in_loop.includes(h.gpio)} />
    })

    return (
        <div className='flex flex-col overflow-hidden'>
            <h1 className='text-5xl m-6 font-bold text-indigo-600'>Sterownik ogrzewania</h1>
            <div className='mx-6 my-4'>
                <p className='text-3xl font-semibold'>Grzejniki</p>
                <ul data-testid='heaters' className='-ml-8 flex flex-wrap'>{toDisplay}</ul>
            </div>
        </div>
    );
}

export default App;
