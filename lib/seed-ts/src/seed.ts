import type { UserInfo, SeedResult } from './types';

export class SeedTs {
    public analyze(userInfo: UserInfo): SeedResult {
        return {
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
            score: 100,
            elements: "Wood, Fire",
            interpretation: "This name is associated with strong natural elements."
        };
    }
}