import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column({ type: 'json' })
  public postJson: string;

  @CreateDateColumn()
  public createdAt: string;

  @UpdateDateColumn()
  public updatedAt: string;
}
