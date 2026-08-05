import { useOptimistic, useState } from "react";

export default function AddTooCard(){
    const[isCart, setIsCart] = useState(false);
    const[OptimisticCart, setOptimisticCart] = useOptimistic(isCart)

    
}