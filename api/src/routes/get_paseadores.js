const { Router } = require("express");
const { User, Preference } = require("../db");
const { filterAndSortWalkers } = require("../utils/filterAndSort");
const queryString = require("query-string");
const shuffle = require("lodash/shuffle");
const { filtersAndSortValues } = require("../utils/utils");

const router = Router();

router.get("/", async (req, res) => {
  const { page, pageSize, inputFilters, selectFilters, sortData, name } =
    req.query;
  const parsedFilters = queryString.parse(inputFilters);
  const parsedSelectFilters = queryString.parse(selectFilters);
  const parsedSortData = queryString.parse(sortData);
  const filtersArray = parsedFilters
    ? Object.entries(parsedFilters).map((filter) => {
        return {
          [filter[0]]:
            filter[0] === "min" || filter[0] === "max"
              ? Number(filter[1])
              : filter[1],
        };
      })
    : [];

  const selectFiltersArray = Object.entries(parsedSelectFilters).map(
    (filter) => {
      return { [filter[0]]: filter[1] };
    }
  );
  parsedSortData.isSortAscending === "true"
    ? (parsedSortData.isSortAscending = true)
    : (parsedSortData.isSortAscending = false);

  const pageN = Number.parseInt(page);
  const pageL = Number.parseInt(pageSize);

  let pageDb = 0;
  if (!Number.isNaN(pageN) && pageN > 0) {
    pageDb = pageN;
  }

  let limit = 10;
  if (!Number.isNaN(pageL) && pageL > 0 && pageL < 20) {
    limit = pageL;
  }

  try {
    const allActiveWalkers = await User.findAndCountAll({
      limit: limit,
      offset: pageDb * limit,
      where: {
        status: "active",
      },
      include: Preference,
    });
    const allActiveWalkersCards = await allActiveWalkers.rows.map((w) => {
      return {
        id: w.id,
        email: w.email,
        name: w.name,
        surname: w.surname,
        image: w.image,
        service: w.service,
        ubication: w.ubication,
        reputation: w.reputation,
        price: w.price,
        premium: w.premium,
        latitude: w.latitude,
        longitude: w.longitude,
        horario: w.preference?.turno,
        description: w.description,
      };
    });

    if (allActiveWalkersCards) {
      //GET BY NAME
      if (name) {
        const nameSearch = allActiveWalkersCards.filter(
          (user) =>
            user.name.toLowerCase().startsWith(name.toLowerCase()) ||
            user.surname.toLowerCase().startsWith(name.toLowerCase())
        );
        return res.status(200).send({
          content: nameSearch,
          totalPages: Math.ceil(nameSearch.length / limit),
        });
      }
    }
    if (
      filtersAndSortValues(filtersArray, selectFiltersArray, parsedSortData)
    ) {
      return res.json({
        content: shuffle(allActiveWalkersCards),
        totalPages: Math.ceil(allActiveWalkersCards.length / limit),
      });
    } else {
      const filteredWalkers = filterAndSortWalkers({
        walkers: allActiveWalkersCards,
        filtersArray,
        selectFiltersArray,
        parsedSortData,
      });
      return res.json({
        content: filteredWalkers,
        totalPages: Math.ceil(filteredWalkers.length / limit),
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
});

module.exports = router;
