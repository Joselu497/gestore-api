// src/price/price.subscriber.ts
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  DataSource,
  EntityManager,
} from 'typeorm';
import { Price } from './price.entity';

@EventSubscriber()
export class PriceSubscriber implements EntitySubscriberInterface<Price> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Price;
  }

  async afterInsert(event: InsertEvent<Price>): Promise<void> {
    // Verificación explícita de que entity no es undefined
    if (!event.entity) {
      return;
    }

    const price = event.entity;

    if (price.active && price.productId) {
      await this.deactivateOtherPrices(price, event.manager);
    }
  }

  async afterUpdate(event: UpdateEvent<Price>): Promise<void> {
    // Verificación explícita de que ambas entidades existen
    if (!event.entity || !event.databaseEntity) {
      return;
    }

    const currentPrice = event.entity as Price;
    const previousPrice = event.databaseEntity;

    const wasActivated =
      currentPrice.active === true && previousPrice.active === false;

    if (wasActivated && currentPrice.productId) {
      await this.deactivateOtherPrices(currentPrice, event.manager);
    }
  }

  private async deactivateOtherPrices(
    activePrice: Price,
    manager: EntityManager,
  ): Promise<void> {
    const priceRepository = manager.getRepository(Price);

    try {
      await priceRepository
        .createQueryBuilder()
        .update(Price)
        .set({ active: false })
        .where('productId = :productId', { productId: activePrice.productId })
        .andWhere('type = :type', { type: activePrice.type })
        .andWhere('active = :active', { active: true })
        .andWhere('id != :id', { id: activePrice.id })
        .execute();

      console.log(
        `Deactivated other prices for product ${activePrice.productId}`,
      );
    } catch (error: unknown) {
      console.error('Error deactivating other prices:', error);
    }
  }
}
