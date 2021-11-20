import './pre-start';
import app from '@server';
import logger from '@shared/Logger';

/* istanbul ignore next */
// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
