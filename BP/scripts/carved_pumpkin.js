import { world, system, GameMode, Direction } from "@minecraft/server";

world.beforeEvents.itemUseOn.subscribe((event) => {
    const { source: player, itemStack, block, blockFace } = event;

    if (block.typeId !== "fom:pale_pumpkin") return;
    if (itemStack?.typeId !== "minecraft:shears") return;

    let targetDirection = blockFace.toLowerCase();

    if (blockFace === Direction.Up || blockFace === Direction.Down) {
        targetDirection = player.cardinalDirection.toLowerCase();
    }

    system.run(() => {
        const dimension = block.dimension;
        const location = block.location;
        
        dimension.setBlockType(location, "fom:carved_pale_pumpkin");
        
        const newBlock = dimension.getBlock(location);
        if (newBlock) {
            const newPermutation = newBlock.permutation.withState("minecraft:cardinal_direction", targetDirection);
            newBlock.setPermutation(newPermutation);
        }

        dimension.playSound("pumpkin.carve", location);

        if (player.getGameMode() !== GameMode.creative) {
            const durability = itemStack.getComponent("minecraft:durability");
            const equippable = player.getComponent("minecraft:equippable");
            
            if (durability && equippable) {
                if (durability.damage + 1 >= durability.maxDurability) {
                    equippable.setEquipment("Mainhand", undefined);
                    dimension.playSound("random.break", player.location);
                } else {
                    durability.damage += 1;
                    equippable.setEquipment("Mainhand", itemStack);
                }
            }
        }
    });
});