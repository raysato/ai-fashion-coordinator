import {Weather} from "server/api/weather"

export const useLocation = () => {
    const location = useState('location', (): GeolocationPosition | null => null)
    const setLocation = (loc: Ref<GeolocationPosition | null>) => (value: GeolocationPosition) => {
        loc.value = value
    }
    const weather = useState('location', (): Weather | null => null)
    const setWeather = (wea: Ref<Weather | null>) => (value: Weather) => {
        wea.value = value
    }

    return {
        location: readonly(location),
        setLocation: setLocation(location),
        weather: readonly(weather),
        setWeather: setWeather(weather)
    }
}