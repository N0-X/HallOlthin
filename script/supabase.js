// ==========================
// 🔌 CONEXÃO
// ==========================

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://pwhskjuidzwcrpnxsayk.supabase.co";
const SUPABASE_KEY = "sb_publishable_VVvosQMMAP60NgyDucdSKw_sj6G_sJu";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// ==========================
// 📁 PASTAS
// ==========================

// Criar pasta
export async function criarPasta(nome, codigo = null) {
    const { data, error } = await supabase
        .from("pastas")
        .insert([{ nome, codigo }])
        .select();

    if (error) {
        console.error("Erro ao criar pasta:", error);
        return null;
    }

    return data[0];
}

// Listar todas as pastas
export async function listarPastas() {
    const { data, error } = await supabase
        .from("pastas")
        .select("*");

    if (error) {
        console.error("Erro ao listar pastas:", error);
        return [];
    }

    return data;
}

// Buscar pasta por código (tipo lobby)
export async function buscarPastaPorCodigo(codigo) {
    const { data, error } = await supabase
        .from("pastas")
        .select("*")
        .eq("codigo", codigo)
        .single();

    if (error) {
        console.error("Erro ao buscar pasta:", error);
        return null;
    }

    return data;
}

// Deletar pasta
export async function deletarPasta(id) {
    const { error } = await supabase
        .from("pastas")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Erro ao deletar pasta:", error);
    }
}


// ==========================
// 📄 FICHAS
// ==========================

// Criar ficha
export async function criarFicha(pastaId, dados) {
    const nome = dados["nome"]?.valor || "Sem nome";

    const { data, error } = await supabase
        .from("fichas")
        .insert([{
            pasta_id: pastaId,
            nome: nome,
            dados: dados
        }])
        .select();

    if (error) {
        console.error("Erro ao criar ficha:", error);
        return null;
    }

    return data[0];
}

// Atualizar ficha existente
export async function atualizarFicha(id, dados) {
    const nome = dados["nome"]?.valor || "Sem nome";

    const { error } = await supabase
        .from("fichas")
        .update({
            nome: nome,
            dados: dados
        })
        .eq("id", id);

    if (error) {
        console.error("Erro ao atualizar ficha:", error);
    }
}

// Listar fichas de uma pasta
export async function listarFichas(pastaId) {
    const { data, error } = await supabase
        .from("fichas")
        .select("*")
        .eq("pasta_id", pastaId);

    if (error) {
        console.error("Erro ao listar fichas:", error);
        return [];
    }

    return data;
}

// Buscar ficha por ID
export async function buscarFicha(id) {
    const { data, error } = await supabase
        .from("fichas")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Erro ao buscar ficha:", error);
        return null;
    }

    return data;
}

export async function buscarFichasGlobal() {
    const { data, error } = await supabase
        .from("fichas")
        .select(`
            id,
            nome,
            dados,
            pasta_id,
            pastas ( nome )
        `);

    if (error) {
        console.error("Erro busca global:", error);
        return [];
    }

    return data;
}

// Deletar ficha
export async function deletarFicha(id) {
    const { error } = await supabase
        .from("fichas")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Erro ao deletar ficha:", error);
    }
}