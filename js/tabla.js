

export const crearTabla =(data)=>
{
    if(!Array.isArray(data))return null;
    const table = document.createElement("table");
    const headers = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];
    table.appendChild(crearCabecera());
    table.appendChild(crearCuerpo(data,headers));
    return table;
}

const crearCabecera =()=>
{
    const headers = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    headers.forEach(valor=>
    {
        const th = document.createElement("th");
        th.textContent = valor;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    return thead; 
}

const crearCuerpo =(data,headers)=>
{
    
    if(!Array.isArray(headers))return null;

    const tbody = document.createElement("tbody");
  
    data.forEach((vehiculo)=>
    {
        if(obtenerAtributos(data).some(atributo =>vehiculo.hasOwnProperty(atributo)))
        {
            const tr = document.createElement("tr");
            headers.forEach(header => 
            {
                const cell = document.createElement("td");
                cell.classList.add(header.toLowerCase());
                if (vehiculo[header]) 
                {
                    cell.textContent = vehiculo[header];
                } 
                else 
                {
                    cell.textContent = "-";
                }
                tr.appendChild(cell);
            });
            tbody.appendChild(tr);
        }
    });

    return tbody;
}

function Vaciar(elemento){
    while(elemento.hasChildNodes())
    {
        elemento.removeChild(elemento.lastChild);
    }
}

export const actualizarTabla =(contenedor,data)=>
{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstElementChild);
    }
    contenedor.appendChild(crearTabla(data));
    
}

function obtenerAtributos(data) 
{
    const atributos = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];;
    return atributos.filter(atributo => data.some(vehiculo => vehiculo.hasOwnProperty(atributo)));
}