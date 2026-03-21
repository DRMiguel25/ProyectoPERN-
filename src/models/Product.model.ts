import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    AutoIncrement
} from 'sequelize-typescript'

/**
 * Modelo Sequelize para la tabla `products`.
 *
 * Campos sincronizados con el contrato del frontend (Guitar LA):
 *  - name        → nombre de la guitarra
 *  - price       → precio numérico con decimales
 *  - image       → nombre/ruta de la imagen (ej. "guitarra_01")
 *  - description → descripción larga del producto
 *  - availability → indicador de disponibilidad (valor por defecto: true)
 */
@Table({
    tableName: 'products'
})
class Product extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare id: number

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true
    })
    declare name: string

    @Column({
        type: DataType.FLOAT,  // Soporta precios con decimales (ej. 299.99)
        allowNull: false
    })
    declare price: number

    // ─── Campos requeridos por el frontend (GAP Analysis §6) ───────────────────

    @Column({
        type: DataType.STRING(255), // Nombre o ruta relativa de la imagen
        allowNull: true             // Permite insertar productos sin imagen aún
    })
    declare image: string

    @Column({
        type: DataType.TEXT,        // TEXT de PostgreSQL: sin límite de caracteres
        allowNull: true             // Permite insertar productos sin descripción aún
    })
    declare description: string

    // ────────────────────────────────────────────────────────────────────────────

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product