import logo from './logo.svg';
import './App.css';
import {useAxios} from "use-axios-client";

function App() {

    const {data, error, loading} = useAxios({
        url: `${process.env.REACT_APP_BASE_URL}/config`
    });

    let toDisplay = (!data || loading) ? <li><p>Pobieranie danych...</p></li> : data.heaters.map(h => {
        return <li>{h.id} -> {h.name}</li>
    })

    return (
        <div className='flex flex-col'>
            <h1 className='text-5xl m-6 font-bold text-indigo-600'>Sterownik ogrzewania</h1>
            <div className='mx-6 my-4'>
                <p className='text-3xl font-semibold'>Grzejniki</p>
                <ul>{toDisplay}</ul>
            </div>
        </div>
    );
}

export default App;
