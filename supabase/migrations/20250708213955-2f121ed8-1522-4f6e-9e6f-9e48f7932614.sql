
-- Update the properties table to change price from numeric to text
ALTER TABLE public.properties 
ALTER COLUMN price TYPE text;
