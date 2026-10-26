import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wzjnxnvbkmzbwckisfjo.supabase.co";
const supabasePublishableKey = "sb_publishable_jU4T52IIlmjgg5KwEOvmkQ_KsLJURYd";

const supabase = createClient(supabaseUrl, supabasePublishableKey);
export default supabase;
