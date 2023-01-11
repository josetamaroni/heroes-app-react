import { useMemo } from "react";
import { getHeroesbyPublischer } from "../helpers"
import { HeroCards } from "./";

export const HeroList = ({publisher}) => {
    const heroes = useMemo( ()=> getHeroesbyPublischer(publisher), [publisher]);
    return (
        <div className="row row-cols-1 row-cols-md-3 g-3">
            { 
                heroes.map( (hero,key) => {
                    return <HeroCards key={hero.id} {...hero}/>
                }) 
            }
        </div>
    )
}
