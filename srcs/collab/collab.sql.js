export const sql = {
  findCollabByCategory: `SELECT p.title, p.duration, p.part FROM Project p JOIN ProjectCategory pc ON p.project_id = pc.project_id JOIN Category c ON pc.category_id = c.category_id WHERE c.category_id = 1;`,
  findCollabById: `SELECT title,duration, wanted, description FROM Project WHERE project_id=?`,
  postMessageSQL: `INSERT INTO Application (project_id, user_id, message, status) VALUES(?,?,?,"지원 중")`,
  postProjectCate1SQL: `
SET @category_ids = ?;

START TRANSACTION;

INSERT INTO Project (title, description, status, user_id, duration, part, wanted)VALUES (?,?,'모집 중',?,?,?,?);

SET @project_id = LAST_INSERT_ID();

INSERT INTO ProjectCategory (project_id, category_id)
SELECT @project_id, CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(@category_ids, ',', numbers.n), ',', -1) AS UNSIGNED)
FROM (
    SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
) numbers
WHERE n <= LENGTH(@category_ids) - LENGTH(REPLACE(@category_ids, ',', '')) + 1;

COMMIT;
  `,
};
