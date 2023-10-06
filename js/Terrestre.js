import { Vehiculo } from "./Vehiculo.js";
export class Terrestre extends Vehiculo
{
    static idAutoIncremental = parseInt(localStorage.getItem("idAutoIncremental"))||5000;
    constructor(id,modelo,anoFab,velMax,cantPue,cantRue)
    {
        super(id,modelo,anoFab,velMax)
        this.id = Terrestre.generaNuevoId();
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }

    setID(id) 
    {
        this.id = id;
    }

    static generaNuevoId()
    {
        const nuevoId = ++Empleado.idAutoIncrementalEmpleado;
        localStorage.setItem("idAutoIncrementalEmpleado",nuevoId.toString());
        return nuevoId;    
    }
}