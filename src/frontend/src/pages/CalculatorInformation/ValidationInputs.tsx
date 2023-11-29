import { useCallback, useState } from 'react';
import { promises } from 'dns';

//todo: quando usar mascaras remover este arquivo
class ValidationInputs {

    // mascaraMoeda => converte o texto digitado no valor da conta para o formato de moeda em Real
    mascaraMoeda(formState: any): string {

        const formater = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });

        return formater.format(parseFloat(formState))

        // ALTERA ELEMENTOS DA STRING
       // setFormState({...formrState, contaLuz: formrState.contaLuz.replace(',', '.')});
    }

    // impedeLetras => Não deixar digitar letras nos Inputs
    impedeLetras(evt: React.FormEvent<HTMLFormElement> | any) {
        var theEvent = evt || window.event;
       var key = theEvent.keyCode || theEvent.which;
       key = String.fromCharCode( key );
       //var regex = /^[0-9.,]+$/;
       var regex = /^[0-9.]+$/;
       if( !regex.test(key) ) {
           theEvent.returnValue = false;
           if(theEvent.preventDefault) theEvent.preventDefault();
       }
   }
}

export default ValidationInputs;