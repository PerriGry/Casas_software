import { getcasas } from "@/service/casas.service";

export async function POST(req) {
    try {
        const {v_nombre} = req.json();
        const result = getcasas(v_nombre);
        return new Response(JSON.stringify({result}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error:error.message}), {status:500})
    }
}