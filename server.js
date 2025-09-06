import http from "node:http";
import { getDataFromDB } from "./db/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import getFilteredDestinations from "./utils/getFilteredDestinations.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, destinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    sendJSONResponse(res, 200, getFilteredDestinations(destinations, req.url));
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    sendJSONResponse(res, 200, getFilteredDestinations(destinations, req.url));
  } else {
    res.setHeader("Content-Type", "application/json");
    sendJSONResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
