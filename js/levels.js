class levelData
{
    constructor(topText, dialogOptions)
    {
        this.topText = topText;
        this.dialogOptions = dialogOptions;
    }

}


const levels =[
    new levelData("\nWell^500.^500.^500.^1000 Shit.^500\n\n^500What's up?", { "Playing this stupid game.": 1, "Just chillin'.": 2 }),
    new levelData("Cool.^500.^500.^500.^500\n\n^500How do you feel? ", { "option 1": 1, "option 2": 2, "option 3": 3, "option 4": 4 })
];