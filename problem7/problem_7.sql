SELECT DISTINCT t.address
FROM trades t
JOIN balances b ON t.address = b.address
WHERE t.block_height > 730000
GROUP BY t.address, t.denom
HAVING SUM(CASE
            WHEN t.denom = 'usdc' THEN t.amount * 0.000001
            WHEN t.denom = 'swth' THEN t.amount * 0.00000005
            WHEN t.denom = 'tmz' THEN t.amount * 0.003
        END) + SUM(CASE
            WHEN b.denom = 'usdc' THEN b.amount * 0.000001
            WHEN b.denom = 'swth' THEN b.amount * 0.00000005
            WHEN b.denom = 'tmz' THEN b.amount * 0.003
        END) >= 500;