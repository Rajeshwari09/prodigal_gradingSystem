import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongooseHealth:MongooseHealthIndicator,
    @InjectConnection() private readonly connection: Connection

  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('adbutler-api', "https://api.adbutler.com/v2/advertisers",{headers:{
        Authorization: `Basic ${process.env.AD_BUTLER_API_KEY}`,
        accept: "application/json",
      }}),
      () => this.mongooseHealth.pingCheck('mongodb',{connection:this.connection}),
    ]);
  }
}