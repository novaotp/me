import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { locale } }) => {
    throw redirect(303, `/${locale}`)
};
