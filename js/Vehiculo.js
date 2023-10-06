export class Vehiculo
{
    constructor(id,modelo,anoFab,velMax)
    {
        if(id != null && modelo != null && anoFab != null && velMax != null)
        {
            this.id = id;
            this.modelo = modelo;
            this.anoFab = anoFab;
            this.velMax = velMax;
        }
    }

    toString()
    {
       return  `{id:"${this.id}",modelo:"${this.modelo}", 
       anoFab: "${this.anoFab}",velMax:"${this.velMax}"}`;
    }


}