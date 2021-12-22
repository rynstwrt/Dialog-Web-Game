const topTextElem = document.getElementById("top-text");
const dialogOptionsElem = document.getElementById("dialog-options")


let currentLevel = 0;
let currentValue = 0;
let currentDialogOptionValues = [];
let currentTypedInstance;


function loadLevel(levelNumber)
{
    // clear last level
    currentDialogOptionValues = [];
    if (currentTypedInstance) currentTypedInstance.destroy();
    while (dialogOptionsElem.firstChild) dialogOptionsElem.removeChild(dialogOptionsElem.firstChild);
    anime({ targets: ["#top", "#bottom"], opacity: 1, duration: 0 });

    // populate with new level
    const levelData = levels[levelNumber];

    const typedOptions = {
        strings: [levelData.topText],
        typeSpeed: 30,
        startDelay: 750,
        onComplete: () =>
        {
            const dialogOptions = levelData.dialogOptions;
            const dialogOptionTexts = Object.keys(dialogOptions);
            const dialogOptionsValues = Object.values(dialogOptions);

            for (let i = 0; i < dialogOptionTexts.length; ++i)
            {
                const optionText = dialogOptionTexts[i];
                const optionValue = dialogOptionsValues[i];

                const optionElem = document.createElement("div");
                optionElem.classList.add("dialog-option");

                const optionTextElem = document.createElement("p");
                optionTextElem.textContent = optionText;

                currentDialogOptionValues.push(optionValue);
                optionElem.append(optionTextElem);
                dialogOptionsElem.append(optionElem);
            }


            anime({
                targets: ".dialog-option",
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 500,
                complete: () =>
                {
                    // add event listeners
                    const dialogOptionsElems = document.getElementsByClassName("dialog-option");
                    for (let i = 0; i < dialogOptionsElems.length; ++i)
                    {
                        const dialogOptionElem = dialogOptionsElems[i];
                        dialogOptionElem.addEventListener("click", () =>
                        {
                            dialogOptionsElem.addEventListener("transitionend", () =>
                            {
                                // fade out the current level
                                anime({
                                    targets: ["#top", "#bottom"],
                                    opacity: 0,
                                    easing: "easeInExpo",
                                    duration: 500,
                                    complete: () =>
                                    {
                                        currentValue += currentDialogOptionValues[i];

                                        if (levels.length - 1 === currentLevel) // end of the game
                                        {
                                            alert("END OF THE GAME");
                                        }
                                        else
                                        {
                                            loadLevel(++currentLevel);
                                        }
                                    }
                                });
                            }, { once: true });
                        });
                    }
                }
            });

        }
    };


    currentTypedInstance = new Typed(topTextElem, typedOptions);
}


loadLevel(currentLevel);




