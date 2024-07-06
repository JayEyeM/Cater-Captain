import React from "react";

const useTotalEventIngredientCost = (eventId: string) => {
    const [ingredients, setIngredients] = React.useState<{ costPerUnit: number; quantityNeeded: number }[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    

    React.useEffect(() => {
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
            try {
                const events = JSON.parse(storedEvents);
                const event = events.find((event: any) => event.id === parseInt(eventId));
                if (event && event.ingredients) {
                    const formattedIngredients = event.ingredients.map((ingredient: any) => ({
                        costPerUnit: parseFloat(ingredient.costPerUnit),
                        quantityNeeded: parseInt(ingredient.quantityNeeded, 10)
                    }));
                    setIngredients(formattedIngredients);
                } else {
                    setError(`Event with id ${eventId} not found or does not have valid ingredients.`);
                }
            } catch (error: any) {
                setError(`Error parsing events from localStorage: ${error.message}`);
            }
        } else {
            setError("No events found in localStorage.");
        }
    }, [eventId]);

    const totalCost = React.useMemo(() => {
        return ingredients.reduce((total, { costPerUnit, quantityNeeded }) => {
            return total + (costPerUnit || 0) * quantityNeeded;
        }, 0);
    }, [ingredients]);

    if (error) {
        // You can remove console.error or handle it differently if needed
        return null; // Return null or handle the error as needed in your component
    }

    return totalCost.toFixed(2); // Format to two decimal places
};

export default useTotalEventIngredientCost;
