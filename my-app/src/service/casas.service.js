import clientPromise from "@/lib/dbmongo";

export const getcasas = async(v_nombre)=>{
    const client = await clientPromise;
    const db = client.db("CasasSoftware");
    const result = await db.collection("casas").findOne({ nombre: v_nombre });

    return result;
}

