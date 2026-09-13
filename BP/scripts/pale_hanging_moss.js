import { world, system, BlockPermutation } from "@minecraft/server";

// Manejador para cuando se coloca el item de pale hanging moss
world.afterEvents.itemUseOn.subscribe((event) => {
    const { source: player, itemStack, block, blockFace } = event;

    // Solo procesar si se usó el item de pale hanging moss
    if (itemStack?.typeId !== "fom:pale_hanging_moss_tip") return;

    // Necesitamos esperar un tick para que el bloque se coloque
    system.run(() => {
        try {
            // Obtener el bloque en la cara donde se colocó
            const newBlockLocation = block.above(blockFace);
            if (!newBlockLocation) return;

            const newBlock = newBlockLocation.getBlock();
            if (!newBlock) return;

            // Si el bloque se colocó correctamente
            if (newBlock.typeId === "fom:pale_hanging_moss_tip") {
                const time = world.getTimeOfDay();
                const isNight = time >= 13000 && time < 23000;
                
                // Cambiar el estado de la permutación basado en la hora
                const targetState = isNight ? 1 : 0; // 0 = día, 1 = noche
                system.run(() => {
                    newBlock.setPermutation(
                        newBlock.permutation.withState("fom:hanging_moss_state", targetState)
                    );
                });
            }
        } catch (error) {
            // Silenciar errores si el bloque no se coloca correctamente
        }
    });
});
