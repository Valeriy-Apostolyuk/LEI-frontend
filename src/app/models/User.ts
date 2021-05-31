import * as _ from "lodash";

export class User {
    id?: number = 0;
    email: string = '';
    name: string = '';
    age?: number = 0;
    gender?: string = '';

    constructor(obj: any) {
        Object.assign(this, _.cloneDeep(obj));
    }
}