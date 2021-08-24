import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../Redux/reducer";

export const UseTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
