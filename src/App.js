import Containers from "./Components/Containers";
import {WeatherProvider} from "./Context/WeatherContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CityProvider} from "./Context/CityContext";

function App() {
    return (
        <WeatherProvider>
            <CityProvider>
                <Containers/>
            </CityProvider>
        </WeatherProvider>
    );
}

export default App;
