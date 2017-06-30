let laisDialog = function(initargs){
    let me = {};
    let regras = [];


    function init(){
        regras = initArgs.regras;
    }

    /**
     *
     * return:
     * {
     *  replies:[{REPLIES}],
     *  context:{}
     * }
     *
     */
    me.resolve(ctx,aiResponse){

        //recuperar regra aplicada
        //retornar contextonovo e  replies

    };

    let mergeContexto = function(ctx,aiResponse){
        // {intents:[],entities:[]}
        // recupero objeto de dialogo atual
        //realizo merge no contexto de acordo com definido no dialogo
        //return NovoContexto
    };


    let getRegra = function (ctx,aiResponse) {

        // alterar contexto com aiResponse
        //Novo contexto.

        //recuperar regra candidatas
        //filtrar regras pelo dialogo atual
        //para cada regra, avaliar se é aplicavel
        //filtrar regras aplicaveis peloa prioridade
        // DEVE retornar só uma regra

        //aplicar ações
        // recupera contexto alterado e replies

    };

    /**
     *
     * @param regra
     * @param contexto
     * @return true|false
     */
    let isAplicavel = function(regra,contexto){

    };

    let aplicarAcoes = function(regra,ctx){
        //recuperar actions
        //decobrir action a ser aplicada
        //DEVE retornar só uma regra


        //executar setContext
        //processar replies
        //alterar o dialogo atual do contexto

        //return
        // {contexto:{}, replies:[]}

    };


    return me;

};