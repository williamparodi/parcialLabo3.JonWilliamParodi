import { Vehiculo } from "./Vehiculo.js";
export class Aereo extends Vehiculo
{
    static idAutoIncremental = parseInt(localStorage.getItem("idAutoIncremental"))||5000;
    constructor(id,modelo,anoFab,velMax,altMax,autonomia)
    {
        super(id,modelo,apellido,edad)
        this.id = Vehiculo.generarNuevoId();
        this.altMax = altMax;
        this.autonomia = autonomia;
    }

    setID(id) 
    {
        this.id = id;
    }
    
    static generaNuevoId()
    {
        const nuevoId = ++Aereo.idAutoIncremental;
        localStorage.setItem("idAutoIncremental",nuevoId.toString());
        return nuevoId;    
    }



}