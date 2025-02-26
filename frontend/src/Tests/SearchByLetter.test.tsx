import { render, screen } from "@testing-library/react";
import axios from "axios";
import { describe, test, expect, vi } from "vitest";
import CocktailCard from "../Components/CocktailCard";

// API function
const getCocktailsByLetter = async (letter: string) => {
  const response = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
  );
  return response.data;
};

// Mock fetch
const fakeFetch = vi.fn();
global.fetch = fakeFetch;

describe("Search for cocktails from thecocktaildb", async () => {
  // Expected results
  const res = {
    drinks: [
      {
        idDrink: "17219",
        strDrink: "Yellow Bird",
        strDrinkAlternate: null,
        strTags: "IBA,NewEra",
        strVideo: null,
        strCategory: "Cocktail",
        strIBA: "New Era Drinks",
        strAlcoholic: "Alcoholic",
        strGlass: "Cocktail glass",
        strInstructions: "Shake and strain into a chilled cocktail glass",
        strInstructionsES:
          "\nAgitar y colar en una copa de c\u00f3ctel fr\u00eda.",
        strInstructionsDE:
          "In ein gek\u00fchltes Cocktailglas sch\u00fctteln und abseihen.",
        strInstructionsFR: null,
        strInstructionsIT:
          "Shakerare e filtrare in una coppetta da cocktail ghiacciata",
        "strInstructionsZH-HANS": null,
        "strInstructionsZH-HANT": null,
        strDrinkThumb:
          "https://www.thecocktaildb.com/images/media/drink/2t9r6w1504374811.jpg",
        strIngredient1: "White Rum",
        strIngredient2: "Galliano",
        strIngredient3: "Triple Sec",
        strIngredient4: "Lime Juice",
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "3 cl",
        strMeasure2: "1.5 cl",
        strMeasure3: "1.5 cl",
        strMeasure4: "1.5 cl",
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: "No",
        dateModified: "2017-09-02 18:53:31",
      },
      {
        idDrink: "12728",
        strDrink: "Yoghurt Cooler",
        strDrinkAlternate: null,
        strTags: null,
        strVideo: null,
        strCategory: "Other / Unknown",
        strIBA: null,
        strAlcoholic: "Non alcoholic",
        strGlass: "Highball Glass",
        strInstructions:
          "Place all ingredients in the blender jar - cover and whiz on medium speed until well blended. Pour in one tall, 2 medium or 3 small glasses and drink up. Note: Use lots of ice in this one - great on hot days! To add ice: Remove the center of the cover while the blender is on - drop 3 or 4 ice cubs and blend until they're completely crushed.",
        strInstructionsES:
          "Coloque todos los ingredientes en la jarra de la licuadora, cubra y bata a velocidad media hasta que est\u00e9n bien mezclados. Vierta un vaso alto, 2 medianos o 3 peque\u00f1os y b\u00e9balo. Nota: Utilice mucho hielo en este caso. \u00a1Excelente para los d\u00edas calurosos! Para agregar hielo: Retire el centro de la tapa mientras la licuadora est\u00e1 encendida; deje caer 3 o 4 cubitos de hielo y licue hasta que est\u00e9n completamente triturados.",
        strInstructionsDE:
          "Alle Zutaten in den Mixer geben - abdecken und bei mittlerer Geschwindigkeit schaumig schlagen, bis sie gut vermischt sind. In ein gro\u00dfes, 2 mittlere oder 3 kleine Gl\u00e4ser f\u00fcllen und geniessen. Hinweis: Verwenden Sie viel Eis in diesem Ger\u00e4t - ideal an hei\u00dfen Tagen! Um Eis hinzuzuf\u00fcgen: Entfernen Sie die Mitte der Abdeckung, w\u00e4hrend der Mixer eingeschaltet ist - lassen Sie 3 oder 4 Eisw\u00fcrfel fallen und mischen Sie sie, bis sie vollst\u00e4ndig zerkleinert sind.",
        strInstructionsFR: null,
        strInstructionsIT:
          "Mettere tutti gli ingredienti nella caraffa del frullatore - coprire e montare a velocit\u00e0 media fino a quando non sono ben amalgamati.Nota: usa molto ghiaccio in questo - ottimo nelle giornate calde!Versare in un bicchiere alto, 2 medi o 3 piccoli e bere.Per aggiungere il ghiaccio: rimuovere il centro del coperchio mentre il frullatore \u00e8 acceso - far cadere 3 o 4 cubetti di ghiaccio e frullare fino a quando non saranno completamente schiacciati.",
        "strInstructionsZH-HANS": null,
        "strInstructionsZH-HANT": null,
        strDrinkThumb:
          "https://www.thecocktaildb.com/images/media/drink/trttrv1441254466.jpg",
        strIngredient1: "Yoghurt",
        strIngredient2: "Fruit",
        strIngredient3: "Ice",
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "1 cup ",
        strMeasure2: "1 cup ",
        strMeasure3: null,
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: "No",
        dateModified: "2015-09-03 05:27:46",
      },
    ],
  };

  // test.todo("makes a GET request to fetch cocktail");

  // Reset mock fetch
  beforeEach(() => {
    fakeFetch.mockReset();
  });

  // Test the search results by letter
  test("Makes a GET request", async () => {
    fakeFetch.mockResolvedValue({
      json: () => new Promise((resolve) => resolve(res)),
    });
    const getDrink = await getCocktailsByLetter("Y");
    expect(getDrink).toEqual(res);
  });

  // ----------------------------------------------------------------------------------

  // Test that the name renders of cocktail (testing prop works)
  test("Check if name renders", () => {
    render(
      <CocktailCard
        id="cocktailId"
        image_url="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview"
        name="Cocktail Name"
        db="api"
      />
    );
    expect(screen.getByText("Cocktail Name")).toBeDefined();
  });
});
