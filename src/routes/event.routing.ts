import { routerConstant } from '../utils/constants/api.constant';
import express from 'express';
import { eventController } from '../controllers';
import { authenToken } from '../utils/middleware/jwt.middleware';

const EventRouting = express.Router();

EventRouting.post(
    `${routerConstant.EVENT_EDITABLE}`,
    authenToken,
    eventController.postEventEditable
);
EventRouting.post(
    `${routerConstant.EVENT_EDITABLE_MAINTAIN}`,
    authenToken,
    eventController.postEventEditableMaintain
);
EventRouting.post(
    `${routerConstant.EVENT_EDITABLE_RELEASE}`,
    authenToken,
    eventController.postEventEditableRelease
);
EventRouting.post(`${routerConstant.POST_EVENT}`, authenToken, eventController.postEvent);
EventRouting.post(
    `${routerConstant.EVENT_EDITABLES}`,
    authenToken,
    eventController.postEventEditables
);
EventRouting.post(
    `${routerConstant.EVENT_EDITABLE_MAINTAINS}`,
    authenToken,
    eventController.postEventEditableMaintains
);
EventRouting.post(
    `${routerConstant.EVENT_EDITABLE_RELEASES}`,
    authenToken,
    eventController.postEventEditableReleases
);

export { EventRouting };
