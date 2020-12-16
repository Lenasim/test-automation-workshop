import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

export const DEFAULT_CITY = '';
export enum TrainingType {
  FULL_TIME = 'FULL_TIME',
  WORK_AND_STUDY = 'WORK_AND_STUDY',
}
registerEnumType(TrainingType, { name: 'TrainingType' });
export const DEFAULT_TRAINING_TYPE = TrainingType.FULL_TIME;

export const getDisplayName = (
  firstName: string,
  lastName: string,
  city = DEFAULT_CITY,
  trainingType = DEFAULT_TRAINING_TYPE
): string => {
  const cityCode : Record<string, string> = {
    Paris: 'PAR',
    Strasbourg: 'SXG',
    Lyon: 'LYON',
    Reims: 'R1S'
  }
  const displayCity = cityCode[city] || city || '?';
  const traningTypeCode : Record<string, string> = {
    WORK_AND_STUDY: 'WnS',
    // FULL_TIME: ''
  }
  return `[${(trainingType === TrainingType.WORK_AND_STUDY
    ? [displayCity, 'WnS']
    : [displayCity]
  ).join(' - ')}] ${firstName} ${lastName}`;
};


@Entity()
@ObjectType()
export default class Wilder extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  firstName!: string;

  @Column()
  @Field(() => String)
  lastName!: string;

  @Column({ default: DEFAULT_CITY })
  @Field(() => String)
  city!: string;

  @Column({ default: DEFAULT_TRAINING_TYPE })
  @Field(() => TrainingType)
  trainingType!: TrainingType;

  @Column()
  @Field(() => String)
  displayName!: string;

  @BeforeInsert()
  setDisplayName(): void {
    this.displayName = getDisplayName(
      this.firstName,
      this.lastName,
      this.city,
      this.trainingType
    );
  }
}
