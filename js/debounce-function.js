

/* Debounce: Quando usamos o event listener no scroll, a cada unico scroll a funcao de callback eh ativada
uma vez. Entao, num scroll comum, a funcao de callback serah ativada dezenas de vezes. A funcao de debounce 
serve para evitar que isso ocorra.

Nesse caso aqui, o script vai esperar o usuario parar de dar scroll para executar o callback do listener.
 */

export default function debounce(callback, delay){
    let timer;

    /* esse retorno eh um macete para preservar o valor da variavel 'timer' sem ter que 
    declara-la do lado de fora da funcao.
     Esse 'args' eh para fazer o codigo ser mais versatil para o caso de o callback 'onScroll' precisar 
    receber argumentos.*/
    return (...args) => {
        /* se o varlor guardado na variavel 'timer' nao for falsy, ele vai cancelar a execucao do
        codigo assincrono.*/
        if(timer) clearTimeout(timer);
        /* vai esperar um tempinho para executar o codigo. Se a funcao for chamada novamente,
        ele vai cancelar essa execucao do codigo e vai executar apenas a ultima que foi chamada. */
        timer = setTimeout(() => {
            callback(...args);
            timer = null;
        }, delay);
    }
}

/* exemplo de uso: 

    const debouncedScroll = debounce(callbackFunction, 200); 
    element.addEventListener('<event>', debouncedScroll);  

    ou

    this.metodo = debounce(this.metodo.bind(this), 200);
      
*/