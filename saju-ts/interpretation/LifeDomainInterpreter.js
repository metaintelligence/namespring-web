import { careerDomain } from './LifeDomainCareerSection.js';
import { healthDomain } from './LifeDomainHealthSection.js';
import { loveDomain } from './LifeDomainLoveSection.js';
import { wealthDomain } from './LifeDomainWealthSection.js';
export function interpretLifeDomains(analysis) {
    return [
        wealthDomain(analysis),
        careerDomain(analysis),
        healthDomain(analysis),
        loveDomain(analysis),
    ];
}
//# sourceMappingURL=LifeDomainInterpreter.js.map