import { Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript"

@Table({ tableName: 'AccountData' })
export class AccountDataModel extends Model<AccountDataModel> {

  @PrimaryKey
  @Column(DataType.UUID)
  id!: string

  @Column(DataType.UUID)
  accountId!: string

  @Column(DataType.TEXT)
  name!: string

  @Column(DataType.TEXT)
  surname!: string

  @Column(DataType.TEXT)
  patronymic!: string

  @Column(DataType.TEXT)
  email!: string

  @Unique
  @Column(DataType.TEXT)
  phone!: string

  @Column(DataType.DATE)
  birthday!: Date

  @Column(DataType.DATE)
  updatedAt!: Date

  @Column(DataType.DATE)
  createdAt!: Date
}