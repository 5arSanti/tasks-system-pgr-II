import { registerAs } from '@nestjs/config';
import { IAppConfiguration } from './interfaces/config.interface';

const appConfigurations = registerAs(
  'configEnvs',
  (): IAppConfiguration => ({
    secret: process.env.SECRET,
  }),
);

export default appConfigurations;
