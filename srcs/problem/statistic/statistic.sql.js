export const sql = {
    

    getIncorrectProblemStatistic: `SELECT * FROM problem WHERE user_id = ? ORDER BY incorrect_count DESC LIMIT 5;`,
    getProblemImageUrls: `
        SELECT problem_id, photo_url AS problemImage 
        FROM photo 
        WHERE problem_id IN (?) AND photo_type = 'problem';
    `,
    // 가장 많이 틀린 category (type_level 2) ID를 조회
    getMostIncorrectCategoryId: `
        SELECT 
            pt2.type_id AS category_id,
            pt2.type_name AS category,
            pt1.type_name AS main_category,
            SUM(p.incorrect_count) AS total_incorrect
        FROM 
            problemtypeassignment pta
        JOIN 
            problemtype pt3 ON pta.type_id = pt3.type_id
        JOIN 
            problemtype pt2 ON pt2.type_id = pt3.parent_type_id
        JOIN 
            problemtype pt1 ON pt1.type_id = pt2.parent_type_id
        JOIN 
            problem p ON p.problem_id = pta.problem_id
        WHERE 
            p.user_id = ?
            AND pt2.type_level = 2
            AND pt3.type_level = 3
            AND pt1.type_level = 1
        GROUP BY 
            pt2.type_id, pt2.type_name, pt1.type_name
        ORDER BY 
            total_incorrect DESC
        LIMIT 1;
    `,
    // 특정 category (type_level 2) 내 하위 카테고리 (type_level 3) 정보 조회
    getSubCategoriesByCategoryId: `
        SELECT 
            pt3.type_name AS sub_category,
            SUM(p.incorrect_count) AS total_incorrect
        FROM 
            problemtypeassignment pta
        JOIN 
            problemtype pt3 ON pta.type_id = pt3.type_id
        JOIN 
            problem p ON p.problem_id = pta.problem_id
        WHERE 
            pt3.parent_type_id = ?
            AND p.user_id = ?
        GROUP BY 
            pt3.type_name
        ORDER BY 
            total_incorrect DESC;
    `,  

    getIncorrectRatioByCategoryId: `
        SELECT 
            pt3.type_name AS sub_category,
            (SUM(p.incorrect_count) * 100.0 / (
                SELECT SUM(p2.incorrect_count)
                FROM problemtypeassignment pta2
                JOIN problem p2 ON p2.problem_id = pta2.problem_id
                WHERE pta2.type_id IN (
                    SELECT pt3.type_id
                    FROM problemtype pt3
                    WHERE pt3.parent_type_id = ?
                )
                AND p2.user_id = ?
            )) AS incorrect_percentage
        FROM 
            problemtypeassignment pta
        JOIN 
            problemtype pt3 ON pta.type_id = pt3.type_id
        JOIN 
            problem p ON p.problem_id = pta.problem_id
        WHERE 
            pt3.parent_type_id = ?
            AND p.user_id = ?
        GROUP BY 
            pt3.type_name
        ORDER BY 
            incorrect_percentage DESC;
    `,

    getAllIncorrectGroupedByCategory: `
        SELECT 
            pt1.type_name AS main_category,  -- type_level 1
            pt2.type_id AS category_id,       -- type_level 2 ID
            pt2.type_name AS category,        -- type_level 2
            pt3.type_name AS sub_category,    -- type_level 3
            SUM(p.incorrect_count) AS total_incorrect
        FROM 
            problem p
        JOIN 
            problemtypeassignment pta ON p.problem_id = pta.problem_id
        JOIN 
            problemtype pt3 ON pta.type_id = pt3.type_id
        JOIN 
            problemtype pt2 ON pt3.parent_type_id = pt2.type_id
        JOIN 
            problemtype pt1 ON pt2.parent_type_id = pt1.type_id
        WHERE 
            p.user_id = ?  -- 사용자 ID로 필터링
        GROUP BY 
            pt1.type_name, pt2.type_id, pt2.type_name, pt3.type_name
        ORDER BY 
            main_category, category, total_incorrect DESC;
    `,
};