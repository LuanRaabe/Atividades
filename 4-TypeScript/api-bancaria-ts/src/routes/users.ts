import {
    CreateUser,
    CreateAccount,
    MakeDeposit,
    MakeTransfer,
    MakeDraft,
    GetExtract,
} from '../controllers';
import Router from 'express';

const route = Router();

route
    .route('/create-user')
    .post(new CreateUser().handle.bind(new CreateUser()));
route
    .route('/create-account')
    .post(new CreateAccount().handle.bind(new CreateAccount()));
route.route('/deposit').post(new MakeDeposit().handle.bind(new MakeDeposit()));
route
    .route('/transfer')
    .post(new MakeTransfer().handle.bind(new MakeTransfer()));
route.route('/draft').post(new MakeDraft().handle.bind(new MakeDraft()));
route.route('/extract').post(new GetExtract().handle.bind(new GetExtract()));

export default route;
