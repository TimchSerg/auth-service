import { Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript"

@Table({ tableName: 'Account' })
export class AccountModel extends Model<AccountModel> {

  @PrimaryKey
  @Column(DataType.UUID)
  id!: string

  @Unique
  @Column(DataType.TEXT)
  login!: string

  @Column(DataType.TEXT)
  password!: string

  @Column(DataType.DATE)
  updatedAt!: Date

  @Column(DataType.DATE)
  createdAt!: Date
}
