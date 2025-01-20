"use client";

import { HairAnalysisResult } from "../services/hairAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalysisResultProps {
  result: HairAnalysisResult;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hair Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Basic Characteristics</h3>
              <dl className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Hair Type:</dt>
                  <dd className="font-medium">{result.type}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Texture:</dt>
                  <dd className="font-medium">{result.texture}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Thickness:</dt>
                  <dd className="font-medium">{result.thickness}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Porosity:</dt>
                  <dd className="font-medium">{result.porosity}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="font-semibold">Health Indicators</h3>
              <dl className="mt-2 space-y-4">
                <div>
                  <dt className="mb-1 flex justify-between">
                    <span className="text-muted-foreground">Health Score</span>
                    <span className="font-medium">{result.healthScore}/10</span>
                  </dt>
                  <Progress value={result.healthScore * 10} />
                </div>
                <div>
                  <dt className="mb-1 flex justify-between">
                    <span className="text-muted-foreground">Moisture Level</span>
                    <span className="font-medium">{result.moistureLevel}/10</span>
                  </dt>
                  <Progress value={result.moistureLevel * 10} />
                </div>
                <div>
                  <dt className="mb-1 flex justify-between">
                    <span className="text-muted-foreground">Damage Level</span>
                    <span className="font-medium">{result.damage}/5</span>
                  </dt>
                  <Progress value={result.damage * 20} className="bg-red-100" />
                </div>
              </dl>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Additional Information</h3>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="text-muted-foreground">Scalp Condition:</dt>
                <dd className="font-medium">{result.scalpCondition}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Protein Balance:</dt>
                <dd className="font-medium">{result.proteinBalance}</dd>
              </div>
              {result.concerns.length > 0 && (
                <div>
                  <dt className="text-muted-foreground">Concerns:</dt>
                  <dd className="font-medium">{result.concerns.join(", ")}</dd>
                </div>
              )}
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}