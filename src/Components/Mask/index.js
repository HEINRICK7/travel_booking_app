export const cpfMask =(value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

export const telefoneMask = (value) => {
    return value
    .replace(/\D/g,"")//Remove tudo o que não é dígito
    .replace(/^(\d{2})(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    
}  

export const  dataMask = (value) => {
    return value
    .replace(/\D/g,"")
    .replace(/(\d{2})(\d)/,"$1/$2")
    .replace(/(\d{2})(\d)/,"$1/$2")
    
}

export const cepMask = (value) => {
    return value
    .replace(/D/g,"")
    .replace(/^(\d{5})(\d)/,"$1-$2")

}

export const monetarioMask = (value) => {
    return value
    .replace(/\D/g,"") // permite digitar apenas numero
    .replace(/(\d{1})(\d{14})$/,"$1.$2") // coloca ponto antes dos ultimos digitos
    .replace(/(\d{1})(\d{11})$/,"$1.$2") // coloca ponto antes dos ultimos 11 digitos
    .replace(/(\d{1})(\d{8})$/,"$1.$2") // coloca ponto antes dos ultimos 8 digitos
    .replace(/(\d{1})(\d{5})$/,"$1.$2") // coloca ponto antes dos ultimos 5 digitos
    .replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos
    
    }

export const pisPasepMask = (value) => {
    return value
    .replace(/\D/g, "")                                      //Remove tudo o que não é dígito
    .replace(/^(\d{3})(\d)/, "$1.$2")                        //Coloca ponto entre o terceiro e o quarto dígitos
    .replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3")            //Coloca ponto entre o quinto e o sexto dígitos
    .replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3.$4") //Coloca ponto entre o décimo e o décimo primeiro dígitos
       
    }

export const rgMask = (value) => {
        return value
        .replace(/\D/g,"")                                  
        .replace(/(\d)(\d{4})$/,"$1.$2")          
        .replace(/(\d)(\d{4})$/,"$1.$2")   
        .replace(/(\d)(\d)$/,"$1-$2")            
      
}