export const sql = {
  subscribe: `
    INSERT INTO subscription (user_id, status, start_date, end_date, payment_status, amount, payment_method, payment_date, transaction_id)
      VALUES (?, '구독', NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), '성공', 50000, '카드', NOW(), '123456789');
  `,
  cancelSubscribe: `
    UPDATE subscription
      SET status = '비구독', end_date = NOW()
    WHERE user_id = ? AND status = '구독';
  `,
  checkSubscriptionStatus: `
    SELECT 
      *
    FROM 
      subscription
    WHERE 
      user_id = ? AND status = '구독' AND NOW() BETWEEN start_date AND end_date
  `,
};
