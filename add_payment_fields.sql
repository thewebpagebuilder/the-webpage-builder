-- Run this SQL in your Supabase SQL Editor to add the new payment and invoice fields to the leads table.

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS "paymentReference" TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS "paymentDate" TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS "invoiceGenerated" BOOLEAN DEFAULT false;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS "gstApplicable" BOOLEAN DEFAULT false;
