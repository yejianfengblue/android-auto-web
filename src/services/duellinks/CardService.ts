enum CardCategory {
  SPELL, TRAP, MONSTER, RITUAL, FUSION, SYNC, XYZ
}

const cardCategoryToColor: Map<CardCategory, string> = new Map([
  [CardCategory.SPELL, "#1D9E74"],  // green
  [CardCategory.TRAP, "#BC5A84"],  // purple
  [CardCategory.MONSTER, "#FF8B53"],  // orange
  [CardCategory.RITUAL, "#9DB5CC"],  // light blue
  [CardCategory.FUSION, "#A086B7"],  // violet 紫色
  [CardCategory.SYNC, "#CCCCCC"],  // white
  [CardCategory.XYZ, "dark"],
  [CardCategory.SPELL, "green"],
  [CardCategory.SPELL, "green"],
])

class Card {
  constructor(readonly name: string, readonly category: CardCategory) {}
}

const knownCards: Array<Card> = [
  new Card('宇宙旋风', CardCategory.SPELL)
]

export default class CardService {

  getCardColor(name: string): string {

      console.log('777')
    const category = knownCards.find(card => card.name === name)?.category;
    return category ? cardCategoryToColor.get(category) || "orange" : "orange";
  }
}
