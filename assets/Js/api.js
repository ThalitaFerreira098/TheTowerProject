const API_URL = 'http://localhost:3000/api';

export async function login(usuario, senha){
    try{

        console.log('enviando dados: ', {usuario, senha});
        const resposta = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({  usuario, senha})
        });

        return await resposta.json();
    }catch (error){
        console.error('Erro na coneção com o servidor:', error);
        return {success: false, message: 'Erro ao conectar com o servidor'}
    }
}