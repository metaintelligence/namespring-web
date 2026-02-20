/**
 * Baseline 신살(神煞) catalog pack.
 *
 * Design goals:
 * - Data-first: definitions live as compact data (mostly tables), not branching code.
 * - Extensible: users can override/extend via config.extensions.catalogs.shinsal.
 * - Math-friendly: when a 신살 can be derived from a formula, we keep it in code (e.g., 도화/역마/화개/공망).
 *
 * Notes on “덕(德) 귀인”:
 * - 천덕(天德) / 월덕(月德) / (천덕합/월덕합) are often defined by 月支 and then checked against
 *   stems or (sometimes) branches in the chart. We encode them as month-branch based tables.
 * - Schools differ (e.g., whether only 日干 counts, or any pillar stem counts). The engine exposes
 *   strategy hooks so you can override scope without changing API.
 */
export declare const DEFAULT_SHINSAL_CATALOG: {
    readonly meta: {
        readonly id: "shinsal.catalog.base";
        readonly version: "0.4";
        readonly description: "Baseline shinsal catalog (천을/태극/문창/문곡/양인/비인 + 록신/국인 + 천관/천복 + 천주/복성/금여/홍염 + 월덕/월덕합/천덕 + day-pillar sets: 괴강/백호).";
    };
    /**
     * Day-stem based lookups: key → (日干 → target 地支 list)
     *
     * Note: schools vary. This is a common baseline; override via config if needed.
     */
    readonly dayStem: {
        /** 天乙貴人 (천을귀인): 日干 → 2 branches */
        readonly CHEON_EUL_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["丑", "未"];
                readonly 乙: readonly ["子", "申"];
                readonly 丙: readonly ["亥", "酉"];
                readonly 丁: readonly ["亥", "酉"];
                readonly 戊: readonly ["丑", "未"];
                readonly 己: readonly ["子", "申"];
                readonly 庚: readonly ["丑", "未"];
                readonly 辛: readonly ["寅", "午"];
                readonly 壬: readonly ["巳", "卯"];
                readonly 癸: readonly ["巳", "卯"];
            };
        };
        /** 太極貴人 (태극귀인): 日干 → branches */
        readonly TAE_GEUK_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["子", "午"];
                readonly 乙: readonly ["子", "午"];
                readonly 丙: readonly ["卯", "酉"];
                readonly 丁: readonly ["卯", "酉"];
                readonly 戊: readonly ["辰", "戌", "丑", "未"];
                readonly 己: readonly ["辰", "戌", "丑", "未"];
                readonly 庚: readonly ["寅", "亥"];
                readonly 辛: readonly ["寅", "亥"];
                readonly 壬: readonly ["巳", "申"];
                readonly 癸: readonly ["巳", "申"];
            };
        };
        /** 文昌貴人 (문창귀인): 日干 → 1 branch */
        readonly MUN_CHANG_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["巳"];
                readonly 乙: readonly ["午"];
                readonly 丙: readonly ["申"];
                readonly 丁: readonly ["酉"];
                readonly 戊: readonly ["申"];
                readonly 己: readonly ["酉"];
                readonly 庚: readonly ["亥"];
                readonly 辛: readonly ["子"];
                readonly 壬: readonly ["寅"];
                readonly 癸: readonly ["卯"];
            };
        };
        /** 文曲貴人 (문곡귀인): 日干 → 1 branch */
        readonly MUN_GOK_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["亥"];
                readonly 乙: readonly ["子"];
                readonly 丙: readonly ["寅"];
                readonly 丁: readonly ["卯"];
                readonly 戊: readonly ["寅"];
                readonly 己: readonly ["卯"];
                readonly 庚: readonly ["巳"];
                readonly 辛: readonly ["午"];
                readonly 壬: readonly ["申"];
                readonly 癸: readonly ["酉"];
            };
        };
        /** 祿神 (록신/건록): 日干 → 1 branch (臨官) */
        readonly LOK_SHIN: {
            readonly branches: {
                readonly 甲: readonly ["寅"];
                readonly 乙: readonly ["卯"];
                readonly 丙: readonly ["巳"];
                readonly 丁: readonly ["午"];
                readonly 戊: readonly ["巳"];
                readonly 己: readonly ["午"];
                readonly 庚: readonly ["申"];
                readonly 辛: readonly ["酉"];
                readonly 壬: readonly ["亥"];
                readonly 癸: readonly ["子"];
            };
        };
        /** 國印貴人 (국인귀인): 日干 → 1 branch */
        readonly GUK_IN_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["戌"];
                readonly 乙: readonly ["亥"];
                readonly 丙: readonly ["丑"];
                readonly 丁: readonly ["寅"];
                readonly 戊: readonly ["丑"];
                readonly 己: readonly ["寅"];
                readonly 庚: readonly ["辰"];
                readonly 辛: readonly ["巳"];
                readonly 壬: readonly ["未"];
                readonly 癸: readonly ["申"];
            };
        };
        /** 天廚貴人 (천주귀인/천주): 日干 → 1 branch (전통적으로 时支에서 특히 중시) */
        readonly CHEON_JU_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["巳"];
                readonly 乙: readonly ["午"];
                readonly 丙: readonly ["巳"];
                readonly 丁: readonly ["午"];
                readonly 戊: readonly ["申"];
                readonly 己: readonly ["酉"];
                readonly 庚: readonly ["亥"];
                readonly 辛: readonly ["子"];
                readonly 壬: readonly ["寅"];
                readonly 癸: readonly ["卯"];
            };
        };
        /** 天官貴人 (천관귀인): 日干 → 1 branch (口诀: 甲未 乙辰 丙巳 丁寅 戊丑 己戌 庚亥 辛申 壬酉 癸午) */
        readonly CHEON_GWAN_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["未"];
                readonly 乙: readonly ["辰"];
                readonly 丙: readonly ["巳"];
                readonly 丁: readonly ["寅"];
                readonly 戊: readonly ["丑"];
                readonly 己: readonly ["戌"];
                readonly 庚: readonly ["亥"];
                readonly 辛: readonly ["申"];
                readonly 壬: readonly ["酉"];
                readonly 癸: readonly ["午"];
            };
        };
        /** 天福貴人 (천복귀인): 日干 → 1 branch (口诀: 甲酉 乙申 丙子 丁亥 戊卯 己寅 庚午 辛巳 壬午 癸巳) */
        readonly CHEON_BOK_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["酉"];
                readonly 乙: readonly ["申"];
                readonly 丙: readonly ["子"];
                readonly 丁: readonly ["亥"];
                readonly 戊: readonly ["卯"];
                readonly 己: readonly ["寅"];
                readonly 庚: readonly ["午"];
                readonly 辛: readonly ["巳"];
                readonly 壬: readonly ["午"];
                readonly 癸: readonly ["巳"];
            };
        };
        /**
         * 福星貴人 (복성귀인): 日干 → branches
         *  - 甲/丙: 寅 or 子
         *  - 乙/癸: 卯 or 丑
         *  - 丁: 亥
         *  - 戊: 申
         *  - 己: 未
         *  - 庚: 午
         *  - 辛: 巳
         *  - 壬: 辰
         */
        readonly BOK_SEONG_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["寅", "子"];
                readonly 乙: readonly ["卯", "丑"];
                readonly 丙: readonly ["寅", "子"];
                readonly 丁: readonly ["亥"];
                readonly 戊: readonly ["申"];
                readonly 己: readonly ["未"];
                readonly 庚: readonly ["午"];
                readonly 辛: readonly ["巳"];
                readonly 壬: readonly ["辰"];
                readonly 癸: readonly ["卯", "丑"];
            };
        };
        /**
         * 金輿貴人 (금여귀인/금여): 日干 → branches
         * Common口诀: 甲辰乙巳 丙戊未 丁己申 庚戌 辛亥 壬丑 癸寅
         */
        readonly GEUM_YEO_GUI_IN: {
            readonly branches: {
                readonly 甲: readonly ["辰"];
                readonly 乙: readonly ["巳"];
                readonly 丙: readonly ["未"];
                readonly 丁: readonly ["申"];
                readonly 戊: readonly ["未"];
                readonly 己: readonly ["申"];
                readonly 庚: readonly ["戌"];
                readonly 辛: readonly ["亥"];
                readonly 壬: readonly ["丑"];
                readonly 癸: readonly ["寅"];
            };
        };
        /**
         * 紅艶煞 (홍염살/홍염): 日干 → branch
         * Common口诀: 甲午 乙申 丙寅 丁未 戊辰 己辰 庚戌 辛酉 壬子 癸申
         */
        readonly HONG_YEOM_SAL: {
            readonly branches: {
                readonly 甲: readonly ["午"];
                readonly 乙: readonly ["申"];
                readonly 丙: readonly ["寅"];
                readonly 丁: readonly ["未"];
                readonly 戊: readonly ["辰"];
                readonly 己: readonly ["辰"];
                readonly 庚: readonly ["戌"];
                readonly 辛: readonly ["酉"];
                readonly 壬: readonly ["子"];
                readonly 癸: readonly ["申"];
            };
        };
    };
    /**
     * Month-branch → target STEM tables (月支 기준: 대상 = 천간).
     *
     * Used for: 월덕/월덕합 and (부분적으로) 천덕/천덕합.
     */
    readonly monthBranchStem: {
        /**
         * 月德貴人 (월덕귀인): 月支 삼합국 → 旺干
         * 寅午戌→丙, 申子辰→壬, 亥卯未→甲, 巳酉丑→庚
         */
        readonly WOL_DEOK_GUI_IN: {
            readonly stems: {
                readonly 寅: readonly ["丙"];
                readonly 卯: readonly ["甲"];
                readonly 辰: readonly ["壬"];
                readonly 巳: readonly ["庚"];
                readonly 午: readonly ["丙"];
                readonly 未: readonly ["甲"];
                readonly 申: readonly ["壬"];
                readonly 酉: readonly ["庚"];
                readonly 戌: readonly ["丙"];
                readonly 亥: readonly ["甲"];
                readonly 子: readonly ["壬"];
                readonly 丑: readonly ["庚"];
            };
        };
        /**
         * 月德合 (월덕합): 月德의 五合 파트너 천간
         * 寅午戌→辛, 申子辰→丁, 亥卯未→己, 巳酉丑→乙
         */
        readonly WOL_DEOK_HAP: {
            readonly stems: {
                readonly 寅: readonly ["辛"];
                readonly 卯: readonly ["己"];
                readonly 辰: readonly ["丁"];
                readonly 巳: readonly ["乙"];
                readonly 午: readonly ["辛"];
                readonly 未: readonly ["己"];
                readonly 申: readonly ["丁"];
                readonly 酉: readonly ["乙"];
                readonly 戌: readonly ["辛"];
                readonly 亥: readonly ["己"];
                readonly 子: readonly ["丁"];
                readonly 丑: readonly ["乙"];
            };
        };
        /**
         * 天德贵人(천덕귀인) - STEM part only.
         * Some months map to a stem, others map to a branch (handled in monthBranchBranch).
         *
         * 正月(寅)丁, 三月(辰)壬, 四月(巳)辛, 六月(未)甲,
         * 七月(申)癸, 九月(戌)丙, 十月(亥)乙, 十二月(丑)庚
         */
        readonly CHEON_DEOK_GUI_IN_STEM: {
            readonly stems: {
                readonly 寅: readonly ["丁"];
                readonly 辰: readonly ["壬"];
                readonly 巳: readonly ["辛"];
                readonly 未: readonly ["甲"];
                readonly 申: readonly ["癸"];
                readonly 戌: readonly ["丙"];
                readonly 亥: readonly ["乙"];
                readonly 丑: readonly ["庚"];
            };
        };
        /**
         * 天德合(천덕합) - STEM part only.
         * 天干五合: 甲己, 乙庚, 丙辛, 丁壬, 戊癸
         *
         * From CHEON_DEOK_GUI_IN_STEM targets:
         * 寅: 丁→壬, 辰: 壬→丁, 巳: 辛→丙, 未: 甲→己,
         * 申: 癸→戊, 戌: 丙→辛, 亥: 乙→庚, 丑: 庚→乙
         */
        readonly CHEON_DEOK_HAP: {
            readonly stems: {
                readonly 寅: readonly ["壬"];
                readonly 辰: readonly ["丁"];
                readonly 巳: readonly ["丙"];
                readonly 未: readonly ["己"];
                readonly 申: readonly ["戊"];
                readonly 戌: readonly ["辛"];
                readonly 亥: readonly ["庚"];
                readonly 丑: readonly ["乙"];
            };
        };
    };
    /**
     * Month-branch → target BRANCH tables (月支 기준: 대상 = 지지).
     *
     * Used for: 천덕(일부 월은 지지로 판정).
     */
    readonly monthBranchBranch: {
        /**
         * 天德贵人(천덕귀인) - BRANCH part only.
         * 二月(卯)申, 五月(午)亥, 八月(酉)寅, 十一月(子)巳
         */
        readonly CHEON_DEOK_GUI_IN_BRANCH: {
            readonly branches: {
                readonly 卯: readonly ["申"];
                readonly 午: readonly ["亥"];
                readonly 酉: readonly ["寅"];
                readonly 子: readonly ["巳"];
            };
        };
    };
    /**
     * Day-pillar sets (日柱-based).
     *
     * Many schools treat these as "only counts when 日柱 itself is in the set".
     * We encode that as requiresDayPillar=true; rules can be overridden.
     */
    readonly dayPillar: {
        /** 魁罡 (괴강): common 4-day-pillar baseline, with optional extended 2. */
        readonly KUI_GANG: {
            readonly requiresDayPillar: true;
            readonly primary: readonly ["庚辰", "壬辰", "庚戌", "戊戌"];
            readonly extended: readonly ["戊辰", "壬戌"];
        };
        /** 白虎大殺 (백호): 7 day-pillar set */
        readonly BAEK_HO: {
            readonly requiresDayPillar: true;
            readonly primary: readonly ["甲辰", "乙未", "丙戌", "丁丑", "戊辰", "壬戌", "癸丑"];
        };
    };
};
