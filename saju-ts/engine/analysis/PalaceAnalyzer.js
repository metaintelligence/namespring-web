import { PillarPosition, PILLAR_POSITION_VALUES } from '../../domain/PillarPosition.js';
import { TenGodCalculator } from './TenGodCalculator.js';
import { familyMember as catalogFamilyMember, familyRelation as catalogFamilyRelation, interpretation as catalogInterpretation, palaceInfo as catalogPalaceInfo, } from './PalaceCatalogData.js';
export const PalaceAnalyzer = {
    palaceInfo: catalogPalaceInfo,
    familyRelation: catalogFamilyRelation,
    familyMember: catalogFamilyMember,
    interpret: catalogInterpretation,
    analyze(pillars, dayMaster, gender) {
        const pillarByPosition = {
            [PillarPosition.YEAR]: pillars.year,
            [PillarPosition.MONTH]: pillars.month,
            [PillarPosition.DAY]: pillars.day,
            [PillarPosition.HOUR]: pillars.hour,
        };
        const result = {};
        for (const position of PILLAR_POSITION_VALUES) {
            const palace = catalogPalaceInfo(position);
            const pillar = pillarByPosition[position];
            if (position === PillarPosition.DAY) {
                result[position] = {
                    palaceInfo: palace,
                    sipseong: null,
                    familyRelation: null,
                    interpretation: null,
                };
            }
            else {
                const sipseong = TenGodCalculator.calculate(dayMaster, pillar.cheongan);
                result[position] = {
                    palaceInfo: palace,
                    sipseong,
                    familyRelation: catalogFamilyRelation(sipseong, gender),
                    interpretation: catalogInterpretation(sipseong, position),
                };
            }
        }
        return result;
    },
};
//# sourceMappingURL=PalaceAnalyzer.js.map