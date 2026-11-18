/* =========================================
   SHIPSAPP - SUPABASE CLIENT
========================================= */

// Importamos Supabase desde su CDN (sin necesidad de npm)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://hgxiphjhqhmvmdgiogkx.supabase.co"; // Ejemplo: https://abcdefgh.supabase.co
const SUPABASE_ANON_KEY = "sb_publishable_x3EW_5qix9VYyghbV6LVzg_ASPUOA1c"; // El texto largo

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);