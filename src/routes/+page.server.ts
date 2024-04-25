import { base } from "$app/paths";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { locale } }) => {
    throw redirect(307, `${base}/${locale}`)
};
