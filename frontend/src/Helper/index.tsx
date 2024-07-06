import { useQuery } from "react-query";
import { SearchHookInterface } from "../Interfaces";
import { api } from "../axios";
import axios from "axios";

export const scrollToResults = () => {
  setTimeout(function () {
    let production = document.querySelector("#results") ?? undefined;

    if (production) production.scrollIntoView();
  }, 1000);
};

export const useSearch = (props: SearchHookInterface) => {
  let apiDb = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
  let customDb = `api/cocktails/`;

  // console.log("useSearch dbType", props.dbType);

  const { data, status } = useQuery(["Get Cocktail Details", props.id], () =>
    axios({
      method: "get",
      url:
        props.dbType === "custom"
          ? `${customDb}${props.id}`
          : `${apiDb}${props.id}`,
      baseURL: props.dbType === "custom" ? process.env.BASE_URL : undefined,
      withCredentials: props.dbType === "custom" ? true : false,
    }).then((res) => {
      let ingredients: string[] = [];
      let instructions: string[] = [];

      let cocktail =
        props.dbType === "custom" ? res.data[0] : res.data.drinks[0];

      if (props.dbType !== "custom") {
        for (let key in cocktail) {
          if (key.includes("strIngredient") && cocktail[key] !== null) {
            ingredients.push(cocktail[key]);
          }
          if (key === "strInstructions") {
            if (cocktail[key].includes(". ")) {
              instructions = cocktail[key].split(". ").slice(0, -1);
            } else if (cocktail[key] !== null) {
              instructions[0] = cocktail[key];
            }
          }
        }
      }

      return {
        id: props.dbType !== "custom" ? cocktail["idDrink"] : cocktail.id,
        name: props.dbType !== "custom" ? cocktail["strDrink"] : cocktail.name,
        img:
          props.dbType !== "custom" ? cocktail["strDrinkThumb"] : cocktail.img,
        category:
          props.dbType !== "custom"
            ? cocktail["strAlcoholic"]
            : cocktail.category,
        ingredients:
          props.dbType !== "custom" ? ingredients : cocktail.ingredients,
        instructions:
          props.dbType !== "custom" ? instructions : cocktail.instructions,
      };
    })
  );

  return {
    data,
    status,
  };
};

export const useAuthentication = () => {
  const { data, status } = useQuery(
    ["Authentication Status Check"],
    () =>
      api
        .get("api/login/status", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Setting status", res.data);
          return res.data;
        }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 60000 * 60000,
      staleTime: Infinity,
      retry: false,
    }
  );

  // https://stackoverflow.com/questions/75211088/if-staletime-is-bigger-than-cachetime-in-react-query-what-happen
  // ----> staleTime: Infinity, cacheTime: 0. This basically means: Never refetch data if you have cached data, but remove data from the cache as soon as I don't use it anymore

  console.log("Hook", data, status);

  return { isAuth: data, status };
};
