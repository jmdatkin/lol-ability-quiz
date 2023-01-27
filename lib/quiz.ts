import Ability from "types/Ability";
import { SkillSlot } from "types/SkillSlotSelect";

const checkAnswer = function(ability: Ability, championName: string, skillSlot: SkillSlot) {
    console.log(ability);
    console.log(championName);
    console.log(skillSlot);
    return ability.champion === championName &&
            ability.slot === skillSlot
};

export { checkAnswer }