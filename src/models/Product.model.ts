import { Table, Column, Model, DataType, Default, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})
class Product extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id: number

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true // Este es el "candado" para evitar duplicados por nombre
    }) 
    name: string

    @Column({                     
        type: DataType.FLOAT, // Para precios con decimales     
        allowNull: false
    })
    price: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity: number

    @Default(true)                
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product;