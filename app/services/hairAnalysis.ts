// Remove "use client" as it's not needed for this service file
export interface HairAnalysisResult {
  type: string;
  texture: string;
  density: number;
  thickness: string;
  porosity: string;
  scalpCondition: string;
  damage: number;
  healthScore: number;
  moistureLevel: number;
  proteinBalance: string;
  concerns: string[];
}

export async function analyzeHairImage(imageData: string): Promise<HairAnalysisResult> {
  // In a production environment, this would call an actual AI service
  // For now, we'll simulate the analysis with realistic sample data
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time

  return {
    type: ["Straight", "Wavy", "Curly", "Coily"][Math.floor(Math.random() * 4)],
    texture: ["Fine", "Medium", "Coarse"][Math.floor(Math.random() * 3)],
    density: Math.floor(Math.random() * 5) + 6, // 6-10 scale
    thickness: ["Thin", "Medium", "Thick"][Math.floor(Math.random() * 3)],
    porosity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    scalpCondition: ["Dry", "Normal", "Oily"][Math.floor(Math.random() * 3)],
    damage: Math.floor(Math.random() * 5) + 1, // 1-5 scale
    healthScore: Math.floor(Math.random() * 4) + 7, // 7-10 scale
    moistureLevel: Math.floor(Math.random() * 5) + 6, // 6-10 scale
    proteinBalance: ["Low", "Balanced", "High"][Math.floor(Math.random() * 3)],
    concerns: [
      "Split ends",
      "Frizz",
      "Breakage",
      "Dryness",
      "Color damage"
    ].slice(0, Math.floor(Math.random() * 3) + 1)
  };
}