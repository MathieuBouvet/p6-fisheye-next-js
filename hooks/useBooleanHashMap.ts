import { useState } from "react";

function useBooleanHashMap<TypeOfKey extends string | number>(
  initial: Record<TypeOfKey, boolean> | [TypeOfKey, boolean][]
) {
  const initialState = Array.isArray(initial)
    ? initial.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<TypeOfKey, boolean>)
    : initial;
  const [state, setState] = useState(initialState);

  const setItem = (itemId: TypeOfKey, value: boolean) => {
    setState(state => {
      if (state[itemId] === value) {
        return state;
      }
      return {
        ...state,
        [itemId]: value,
      };
    });
  };

  const toggleItem = (itemId: TypeOfKey) => {
    setState(state => ({
      ...state,
      [itemId]: !state[itemId],
    }));
  };

  return [state, setItem, toggleItem] as const;
}

export default useBooleanHashMap;
