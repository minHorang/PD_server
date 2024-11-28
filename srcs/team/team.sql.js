export const sql = {
  findTeamByCategory: `
SELECT 
    p.title, 
    p.duration, 
    p.part
FROM 
    Project p
JOIN ProjectCategory pc 
    ON p.project_id = pc.project_id
JOIN Category c 
    ON pc.category_id = c.category_id
WHERE 
    c.category_id = 1
    AND p.project_id NOT IN (
        SELECT project_id 
        FROM ProjectCategory
        WHERE category_id != 1
    )
  ;`,
  findTeamById: `SELECT title,duration, wanted, description FROM Project WHERE project_id=?`,
  postMessageSQL: `INSERT INTO Application (project_id, user_id, message, status) VALUES(?,?,?,"지원 중")`,
  postProjectSQL: `START TRANSACTION;
                    INSERT INTO Project (title, description, status, user_id, duration, part, wanted)
                    VALUES (?,?,'모집 중',?,?,?,?);
                    SET @project_id = LAST_INSERT_ID();
                    INSERT INTO ProjectCategory (project_id, category_id) VALUES(@project_id,?);
                    COMMIT;`,
  findMypageInfoSQL: `
SELECT DISTINCT
    m.message,
    t.title,
    u.name AS user_name
FROM 
    User u
LEFT JOIN (
    SELECT 
        cs.message AS message,
        cs.project_id
    FROM CollabSuggest cs
    UNION ALL
    SELECT 
        a.message AS message,
        a.project_id
    FROM Application a
    WHERE a.user_id = 1
) m
    ON m.project_id IN (SELECT project_id FROM Project WHERE user_id = 1)
LEFT JOIN (
    SELECT 
        p.title AS title,
        p.user_id
    FROM Project p
    UNION ALL
    SELECT 
        po.title AS title,
        po.user_id
    FROM Portfolio po
) t
    ON t.user_id = u.user_id
WHERE 
    u.user_id = ?;
    `,
};
