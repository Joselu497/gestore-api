import * as bcrypt from 'bcrypt';
import dataSource from '../datasource';
import { User } from '../../src/users/user.entity';

export class SeedService {
  async seedAdminUser() {
    try {
      await dataSource.initialize();

      const userRepository = dataSource.getRepository(User);

      const existingAdmin = await userRepository.findOne({
        where: { name: 'admin' },
      });

      if (existingAdmin) {
        console.log('⚠️  El usuario admin ya existe');
        return;
      }

      const adminUser = userRepository.create({
        name: 'admin',
        password: await bcrypt.hash('password', 10),
        isAdmin: true,
      });

      await userRepository.save(adminUser);
    } catch (error) {
      console.error('❌ Error en seed:', error);
    } finally {
      await dataSource.destroy();
    }
  }
}
