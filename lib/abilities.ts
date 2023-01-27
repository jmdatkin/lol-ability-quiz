import { connectToDatabase } from "./mongodb";
import Cheerio from "cheerio";
import axios from "axios";
import { SkillSlot } from "types/SkillSlotSelect";
import Ability from "types/Ability";

const replacements = {
    'JarvanIV': 'Jarvan IV'
};

async function fetchChampionNames() {
    try {
        const { data } = await axios.get(
            'https://leagueoflegends.fandom.com/wiki/List_of_champions'
        );
        const $ = Cheerio.load(data);
        const champs: string[] = [];

        $('table.champions-list-legend + table').find('span.champion-icon > span > a').each((idx, el) => {
            let champName = $(el).html()?.replace(' ', '').split('<br>')[0];
            champs.push(replacements.hasOwnProperty(champName) ? replacements[champName] : champName);
        });

        return champs;
    } catch (error) {
        throw error;
    }
}

async function fetchAbilityData() {
    try {
        const abilities = [];

        for (const champion of await fetchChampionNames()) {
            let innate = null,
                q = null,
                w = null,
                e = null,
                r = null;

            try {
                const { data } = await axios.get(
                    `https://leagueoflegends.fandom.com/wiki/${champion}/LoL`,
                );
                const $ = Cheerio.load(data);

                innate = {
                    champion,
                    name: $('div.skill.skill_innate div.skill_header div.ability-info-container div.champion-ability__header h3 span.mw-headline').text(),
                    slot: SkillSlot.INNATE
                };
                q = {
                    champion,
                    name: $('div.skill.skill_q div.skill_header div.ability-info-container div.champion-ability__header h3 span.mw-headline').text(),
                    slot: SkillSlot.Q
                };
                w = {
                    champion,
                    name: $('div.skill.skill_w div.skill_header div.ability-info-container div.champion-ability__header h3 span.mw-headline').text(),
                    slot: SkillSlot.W
                };
                e = {
                    champion,
                    name: $('div.skill.skill_e div.skill_header div.ability-info-container div.champion-ability__header h3 span.mw-headline').text(),
                    slot: SkillSlot.E
                };
                r = {
                    champion,
                    name: $('div.skill.skill_r div.skill_header div.ability-info-container div.champion-ability__header h3 span.mw-headline').text(),
                    slot: SkillSlot.R
                };
            } catch (e) {

            }

            abilities.push(innate, q, w, e, r);
        }

        return abilities;
    } catch (error) {
        throw error;
    }
}

async function syncAbilities() {
    const { database } = await connectToDatabase();

    const collectionExists = await database.collection('abilities').count() > 0;

    if (!collectionExists) {
        const abilityData = await fetchAbilityData();
        const abilities = await abilityData.filter(a => a !== null);
        await database.collection('abilities').insertMany(abilities);
    }
}

async function test() {
    const { database } = await connectToDatabase();

    await database.collection('abilities').insertOne({ name: 'beef' });
}

async function getAbilities() {
    const { database } = await connectToDatabase();
    return await database.collection('abilities').find().toArray();
}

async function getChampionNames() {
    const abilities = await getAbilities();
    const champNames = await abilities.map((ability: Ability) => ability.champion);
    const uniqueChampNames = await champNames.filter((item, pos, self) => {
        return self.indexOf(item) === pos;
    });
    return uniqueChampNames.sort();
};

export { getAbilities, getChampionNames };