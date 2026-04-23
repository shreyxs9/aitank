export function SupabaseNotice() {
  return (
    <div className="rounded-[1.5rem] border border-coral/30 bg-coral/10 p-5 text-sm leading-6 text-white/78">
      <p className="font-semibold text-white">Supabase setup needed</p>
      <p className="mt-2">
        Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your local `.env`, then run the
        SQL in `supabase/schema.sql`.
      </p>
    </div>
  )
}
