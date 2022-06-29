import { app } from './server';
import { config } from './config';
import { DbTest } from './clients/dao/postgres/test';

app.listen(config.PORT, () =>
    console.log(`server listening on port ${config.PORT}`),
);

new DbTest().execute().then(() => console.log('success'));
