import React from "react"; 

//hook to fetch event data from local storage
export const useEventData = () => {
    const [eventData, setEventData] = React.useState<any[]>([]);
    React.useEffect(() => {
        const storedEventData = localStorage.getItem("events");
        if (storedEventData) {
            setEventData(JSON.parse(storedEventData));
        }
    }, []);
    return eventData;
}

