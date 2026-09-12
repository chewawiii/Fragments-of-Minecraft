import { world, BlockPermutation, system } from "@minecraft/server";

const EyeblossomTickerComponent = {
    onTick(event) {
        const { block } = event;
        updateEyeblossomState(block);
    }
};

const HangingMossTickerComponent = {
    onTick(event) {
        const { block } = event;
        updateHangingMossState(block);
    }
};

function updateEyeblossomState(block) {
    const time = world.getTimeOfDay();
    const isNight = time >= 13000 && time < 23000;

    try {
        if (isNight) {
            if (block.typeId === "fom:eyeblossom_bush") {
                system.run(() => {
                    block.setPermutation(BlockPermutation.resolve("fom:eyeblossom_bush_wakeup"));
                });
            }
        } else {
            if (block.typeId === "fom:eyeblossom_bush_wakeup") {
                system.run(() => {
                    block.setPermutation(BlockPermutation.resolve("fom:eyeblossom_bush"));
                });
            }
        }
    } catch (error) {
        // El bloque puede no ser válido más
    }
}

function updateHangingMossState(block) {
    const time = world.getTimeOfDay();
    const isNight = time >= 13000 && time < 23000;

    try {
        if (isNight) {
            if (block.typeId === "fom:pale_hanging_moss_tip") {
                system.run(() => {
                    block.setPermutation(BlockPermutation.resolve("fom:pale_hanging_moss_tip_wakeup"));
                });
            }
        } else {
            if (block.typeId === "fom:pale_hanging_moss_tip_wakeup") {
                system.run(() => {
                    block.setPermutation(BlockPermutation.resolve("fom:pale_hanging_moss_tip"));
                });
            }
        }
    } catch (error) {
        // El bloque puede no ser válido más
    }
}

world.beforeEvents.worldInitialize.subscribe((eventData) => {
    eventData.blockComponentRegistry.registerCustomComponent(
        "fom:eyeblossom_ticker",
        EyeblossomTickerComponent
    );
    eventData.blockComponentRegistry.registerCustomComponent(
        "fom:hanging_moss_ticker",
        HangingMossTickerComponent
    );
});