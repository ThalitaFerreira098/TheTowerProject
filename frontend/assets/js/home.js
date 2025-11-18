function irPara(pagina){
    window.location.href = pagina;
}

function atualizarSaudacao(){
    const agora = new Date();
    const hora = agora.getHours();
    let saudacao;

    if(hora >= 5 && hora < 12){
        saudacao = "Bom dia Jefferson, bem-vindo de volta!";
    } 
    else if(hora >= 12 && hora < 18){
        saudacao = "Boa tarde Jefferson, bem-vindo de volta!";
    }
    else{
        saudacao = "Boa noite Jefferson, bem-vindo de volta!";
    }
    document.getElementById("saudacao").textContent = saudacao;
}

document.addEventListener("DOMContentLoaded", atualizarSaudacao);