import { world, system } from "@minecraft/server";

const TICK_INTERVAL = 20;

const SPAWN_CHANCE = 0.6;

system.runInterval(() => {
    const timeOfDay = world.getTimeOfDay();
    
    const isNight = timeOfDay >= 13000 && timeOfDay <= 23000;
    
    if (!isNight) return;

    for (const player of world.getPlayers()) {
        try {
            const { location, dimension } = player;
            
            const biome = dimension.getBiome(location);
            
            if (biome && biome.id === "minecraft:pale_garden") {
                
                if (Math.random() < SPAWN_CHANCE) {
                    dimension.spawnParticle("fom:creaking_eyes", location);
                }
            }
        } catch (error) {
        }
    }
}, TICK_INTERVAL);