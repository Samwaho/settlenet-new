-- Clean up duplicate phone numbers
-- This script removes duplicate phone numbers, keeping only the oldest record for each phone number

-- First, let's see what duplicates we have
SELECT 
    "phoneNumber", 
    COUNT(*) as count,
    MIN("createdAt") as oldest,
    MAX("createdAt") as newest
FROM "GuestRegistration" 
GROUP BY "phoneNumber" 
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- Delete duplicates, keeping only the oldest record for each phone number
WITH duplicates AS (
    SELECT 
        id,
        "phoneNumber",
        "createdAt",
        ROW_NUMBER() OVER (
            PARTITION BY "phoneNumber" 
            ORDER BY "createdAt" ASC
        ) as rn
    FROM "GuestRegistration"
)
DELETE FROM "GuestRegistration" 
WHERE id IN (
    SELECT id 
    FROM duplicates 
    WHERE rn > 1
);

-- Verify no duplicates remain
SELECT 
    "phoneNumber", 
    COUNT(*) as count
FROM "GuestRegistration" 
GROUP BY "phoneNumber" 
HAVING COUNT(*) > 1;
