"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { CameraComponent } from "./components/camera";
import { useToast } from "@/components/ui/use-toast";
import { analyzeHairImage, type HairAnalysisResult } from "./services/hairAnalysis";
import { AnalysisResult } from "./components/analysis-result";

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<HairAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setAnalysisResult(null);
    toast({
      title: "Photo captured!",
      description: "Your photo has been captured successfully.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image under 10MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        setAnalysisResult(null);
        toast({
          title: "Photo uploaded!",
          description: "Your photo has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeHairImage(capturedImage);
      setAnalysisResult(result);
      toast({
        title: "Analysis complete!",
        description: "Your hair analysis results are ready.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your hair. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Your Personal Hair Analysis Tool
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Get a detailed analysis of your hair type, characteristics, and personalized care recommendations using advanced AI technology.
          </p>
        </section>

        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Start Your Hair Analysis</CardTitle>
            <CardDescription>
              Choose how you'd like to analyze your hair
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                <TabsTrigger value="camera">Use Camera</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-6">
                <div className="flex flex-col items-center gap-6">
                  <div 
                    className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-muted"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {capturedImage ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={capturedImage}
                          alt="Uploaded photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your photo here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Maximum file size: 10MB. Formats: JPG, PNG
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Upload Photo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="camera" className="mt-6">
                <CameraComponent onCapture={handleCapture} />
              </TabsContent>
            </Tabs>

            {capturedImage && !analysisResult && (
              <div className="mt-6 flex justify-center">
                <Button 
                  size="lg" 
                  variant="default"
                  onClick={handleAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Hair...
                    </>
                  ) : (
                    "Analyze Hair"
                  )}
                </Button>
              </div>
            )}

            {analysisResult && (
              <div className="mt-6">
                <AnalysisResult result={analysisResult} />
              </div>
            )}
          </CardContent>
        </Card>

        <section className="mt-16 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>
                Advanced machine learning algorithms analyze your hair characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
                  alt="AI Analysis"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>
                Get custom product and care routine suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800"
                  alt="Personalized Care"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>
                Monitor your hair health journey over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800"
                  alt="Progress Tracking"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}