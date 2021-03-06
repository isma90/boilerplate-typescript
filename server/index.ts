import { env } from 'process';
import { config, logger, Server } from './common';

(async () => {
  logger.info(`RUN ${env.NODE_ENV} ENVIRONMENT`);
  const port: number = config.PORT_APP;
  const server = await new Server().Start();
  server.listen(port);
  server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    switch (error.code) {
      case 'EACCES':
        logger.error('Port requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error('Port is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
  server.on('listening', () => {
    logger.info(
      `Server is running in process  ${process.pid} listening on PORT ${port} \n`
    );
  });
})();
