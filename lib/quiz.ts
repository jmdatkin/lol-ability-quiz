import Ability from "types/Ability";
import { SkillSlot } from "types/SkillSlotSelect";

const checkAnswer = function(ability: Ability, championName: string, skillSlot: SkillSlot) {
    return ability.champion === championName &&
            ability.slot === skillSlot
};

export { checkAnswer }