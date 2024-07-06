import React from "react";

//hook for getting the costPerUnit from each item in ingredientList{eventId} and summing them up
// FROM INGREDIENT LIST

const useTotalIngredientListCost = (eventId: string) => {
  //from ingredientList-{eventId}
  const [ingredientList, setIngredientList] = React.useState<{ item: { costPerUnit: number }; quantity: number }[]>([]);
  React.useEffect(() => {
    const storedIngredients = localStorage.getItem(`ingredientList-${eventId}`);
    if (storedIngredients) {
      setIngredientList(JSON.parse(storedIngredients));
    }
  }, [eventId]);
  //calculate total of costPerUnit * quantity for each item in ingredientList then add all the totals together
  const totalCost = React.useMemo(() => {
    return ingredientList.reduce((total, { item, quantity }) => {
      return total + (item.costPerUnit || 0) * quantity;
    }, 0);
  }, [ingredientList]);
  return totalCost;
};

export default useTotalIngredientListCost;