import { status } from "../config/response.status.js";
import { getTempData, testDB } from "./temp.service.js";
import { response } from "../config/response.js";
import { CheckFlag } from "./temp.service.js";

export const tempTest = (req, res, next) => {
  res.send(response(status.SUCCESS, getTempData()));
};

export const tempException = (req, res, next) => {
  console.log("/temp/exception/" + req.params.flag);
  return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
};

export const tempDbtest = async (req, res) => {
  try {
    const db = await testDB();
  } catch (error) {}
};
