    /* criaremos uma função no documento JS.
    Essa função, no caso, já existe na biblioteca do JS */


function toggleMode() {
    /* the function toggleMode is a feature or function that allows you 
    to switch between two states or options*/


    const html = document.documentElement
    /* aqui estamos criando uma variavel que se chama html e atribuindo, no valor,
    a classe que foi nomeada no documento html */


    /* agora vamos criar um comando que vai, no caso, adcionar a classe ou
    removê-la ao clicar no botão*/
    /*
    if(html.classList.contains('light_mode')) 
        {html.classList.remove('light_mode')}
        else {html.classList.add('light_mode')} */

    /* Entretanto, existe ja uma funcionalidade que faz exatamente isso
    de uma maneira mais cimplificada*/

    html.classList.toggle('light_mode')

}
