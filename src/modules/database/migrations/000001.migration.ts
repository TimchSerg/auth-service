import { QueryInterface } from "sequelize/types";
import { DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.createTable('Account', {
      id: { type: DataTypes.UUID, primaryKey: true },
      login: { type: DataTypes.TEXT, unique: true },
      password: DataTypes.TEXT,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE
    })

  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.dropTable('Account')
  })
}
