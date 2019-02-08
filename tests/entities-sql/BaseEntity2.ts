import { Collection, IEntity } from '../../lib';
import { MetadataStorage } from '../../lib/metadata/MetadataStorage';
import { ReferenceType } from '../../lib/decorators/Entity';

export abstract class BaseEntity2 {

  constructor() {
    const metadata = MetadataStorage.getMetadata();
    const meta = metadata[this.constructor.name];
    const props = meta.properties;

    Object.keys(props).forEach(prop => {
      if ([ReferenceType.ONE_TO_MANY, ReferenceType.MANY_TO_MANY].includes(props[prop].reference)) {
        (this as any)[prop] = new Collection(this);
      }
    });
  }

}

export interface BaseEntity2 extends IEntity<number> { }
