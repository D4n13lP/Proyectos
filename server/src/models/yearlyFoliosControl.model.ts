// src/models/yearlyFoliosControl.model.ts
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'yearlyFoliosControl' })
export class YearlyFoliosControl extends Model {
  @PrimaryKey
  @Column({ type: DataType.SMALLINT })
  declare year: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare ultimoFolio: number;

}
