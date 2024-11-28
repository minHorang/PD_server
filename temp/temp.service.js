import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { tempResponseDTO } from "./temp.response.dto.js";
import { flagResponseDTO } from "./temp.response.dto.js";

export const getTempData = () => {
  return tempResponseDTO("This is TEST! >.0");
};

export function CheckFlag(flag) {
  if (flag == 1) throw new BaseError(status.BAD_REQUEST); // 에러 발생시키기!
  else {
    return flagResponseDTO(flag);
  }
}

export const testDB = async () => {
  console.log("실행");
  try {
    //이름, 아이디, 패스워드가 모두 있으면
    const [response] = await pool.query(sql.allDB);
    console.log(response);
  } catch (error) {
    throw new BaseError(status.BAD_REQUEST, "조회 실패");
  }
};

const sql = {
  allDB: `SELECT title, part, duration FROM Portfolio WHERE category_id=?`,
};
