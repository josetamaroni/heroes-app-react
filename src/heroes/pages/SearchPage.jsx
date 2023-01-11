import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useForm } from "../hooks/useForm";
import { getHeroByName } from "../helpers";
import { HeroCards } from "../components";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  let heroes = getHeroByName(q);

  const {searchText, onInputChange} = useForm({
    searchText: q
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if( searchText.trim().length <= 1 ) return;
    navigate(`?q=${searchText.trim()}`)
  }

  return (
    <>
      <h1>SearchHero</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <form onSubmit={ onSearchSubmit }>
            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }
            /> 
            <button className="btn btn-outline-info mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Result</h4>
          <hr />
          {
            ( q === '' )
              ? <div className="alert alert-primary">Search a hero</div>
              : ( heroes.length === 0 ) 
                && <div className="alert alert-danger">No hero with <b>{ q }</b></div>
          }

          {
            heroes.map( hero => (
              <HeroCards key={hero.id} {...hero} />
            ))
          }
        </div>
      </div>
    </>
  )
}
