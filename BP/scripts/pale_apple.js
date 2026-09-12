import { world, system } from "@minecraft/server";

world.afterEvents.itemCompleteUse.subscribe((event) => {
    const { itemStack, source: player } = event;

    if (itemStack.typeId === "fom:pale_apple") {
        
        player.addEffect("resistance", 200, {
            amplifier: 0,
            showParticles: true
        });

    }
});