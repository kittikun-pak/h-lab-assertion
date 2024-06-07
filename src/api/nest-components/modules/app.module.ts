import { Module } from '@nestjs/common';

import { ProductController } from '../../controllers/product';
import { ServiceModule } from './service-module'

@Module({
  imports: [ 
    ServiceModule,
  ],
  controllers: [
    ProductController,
  ],
  providers: [
    
  ],
})

export class AppModule {}
