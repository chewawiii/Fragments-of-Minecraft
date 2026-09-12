import { world, GameMode } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('fom:grow_pale_mushroom', {
        onPlayerInteract({ block, player }) {
            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');

            if (selectedItem?.typeId === 'minecraft:bone_meal') {
                const chance = Math.random();
                const { x, y, z } = block.location;
                let success = false;

                if (chance <= 0.10) {
                    block.dimension.runCommand(`structure load mystructure:large_pale_mushroom_1 ${x - 1} ${y} ${z - 1}`);
                    success = true;
                } 
                else if (chance <= 0.20) {
                    block.dimension.runCommand(`structure load mystructure:large_pale_mushroom_2 ${x - 1} ${y} ${z - 1}`);
                    success = true;
                } 
                else if (chance <= 0.30) {
                    block.dimension.runCommand(`structure load mystructure:large_pale_mushroom_3 ${x - 1} ${y} ${z - 1}`);
                    success = true;
                }

                block.dimension.playSound('item.bone_meal.use', block.location);
                block.dimension.runCommand(`particle minecraft:crop_growth_emitter ${x} ${y + 0.5} ${z}`);

                if (player.getGameMode() !== GameMode.creative) {
                    if (selectedItem.amount > 1) {
                        selectedItem.amount -= 1;
                        equipment.setEquipment('Mainhand', selectedItem);
                    } else {
                        equipment.setEquipment('Mainhand', undefined);
                    }
                }
            }
        }
    })
})