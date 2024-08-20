export const sql = {

    subscribe: `
    UPDATE user
    SET subscribe = true
    WHERE user_id = ?
    `,
    cancelSubscribe:`
    UPDATE user
    SET subscribe = false
    WHERE user_id = ?`
}