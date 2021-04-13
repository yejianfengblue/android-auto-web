import { Card } from "./Card";
import { Character } from "./Character";

export default class DuelLinksAccount {

  constructor(
    readonly id: string,
    readonly playerId: string,
    private device: string, private emulatorIndex: number, private appIndex: number,
    private gem: number, private giftExpireDate: Date,
    private stage: number, private stageUpTime: Date,
    private currentChar: Character, private chars: Array<Character>,
    private deck: string, private cards: Array<Card>, private pkg: string) {}
}
