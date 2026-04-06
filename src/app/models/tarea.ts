    export class Tarea {
        constructor(
            public id_tarea: number,
            public titulo: string,
            public descripcion: string,
            public fecha_creacion: Date,
            public fecha_vencimiento: Date,
            public estado: string,
            public id_usuario: number,
            public id_categoria: number
        ) {}
    }