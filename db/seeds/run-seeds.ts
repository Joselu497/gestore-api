import { SeedService } from './seed.service';

async function runSeeds() {
  const seedService = new SeedService();
  await seedService.seedAdminUser();
}

runSeeds();
