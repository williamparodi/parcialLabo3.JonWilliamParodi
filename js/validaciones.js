function validaVehiculo(vehiculo)
{
    retorno = false;
    if(validarLetras(vehiculo.modelo) && validarNumeros(vehiculo.anoFab) && vehiculo.anoFab > 1885
        && validarNumeros(vehiculo.velMax))
    {
        retorno = true;
    }
    return retorno;
}

export function validaTerrestre(terrestre)
{
    retorno = false;
    if(validaVehiculo(terrestre)
        && validarNumeros(terrestre.canRue))
    {
        if(terrestre.canPue > 0)
        {
            retorno = true;
        }
        else
        {
            alert("datos erroneos ,terrestre invalidado");
        }
    }
    return retorno;
}


export function validaAereo(aereo)
{
    retorno = false;
    if(validaVehiculo(aereo) && validarNumeros(aereo.altMax) && validarNumeros(aereo.autonomia))
    {
        retorno = true;
    }
    else
    {
        alert("datos erroneos, aereo invalidado");
    }
    return retorno;
}

export function validarNumeros(numero)
{
    let retorno = false;
    if(!isNaN(numero)&& numero >0)
    {
        retorno = true;
    }
    else
    {
        alert("Solo numeros validos","mensaje-error");
    }
    return retorno;
}

export function validarLetras(palabras)
{
    let retorno = false;
    if(palabras.length > 0 && palabras.length < 50)
    {
        retorno = true;
    }
    else
    {
        alert("Se paso con la cantidad de palabras","mensaje-error");
    }
    return retorno;
}