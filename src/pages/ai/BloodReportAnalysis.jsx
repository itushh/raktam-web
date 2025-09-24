import { useState, useRef } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Loader2, Upload, FileText, AlertCircle, CheckCircle, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { getApiEndpoint } from "../../config/env.js";
import toast from "react-hot-toast";

export function BloodReportAnalysis() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PDF file for analysis');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setSelectedFile(file);
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please upload a blood report file.");
            return;
        }

        setIsLoading(true);
        setAnalysis(null);

        try {
            const formData = new FormData();
            formData.append('bloodReport', selectedFile);

            const response = await fetch(getApiEndpoint('/api/blood-report/analyze'), {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to analyze blood report');
            }

            const result = await response.json();

            if (result.success) {
                setAnalysis(result.data);
            } else {
                throw new Error(result.message || 'Analysis failed');
            }
        } catch (error) {
            console.error("Blood report analysis error:", error);
            toast(error.message, { type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "normal":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "high":
                return <TrendingUp className="h-4 w-4 text-orange-500" />;
            case "low":
                return <TrendingDown className="h-4 w-4 text-red-500" />;
            default:
                return <Activity className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "normal":
                return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
            case "high":
                return "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400";
            case "low":
                return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
            default:
                return "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400";
        }
    };

    const getRiskColor = (risk) => {
        switch (risk?.toLowerCase()) {
            case "low":
                return "text-green-600";
            case "medium":
                return "text-orange-600";
            case "high":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    const getHealthColor = (health) => {
        switch (health?.toLowerCase()) {
            case "good":
                return "text-green-600";
            case "moderate":
                return "text-orange-600";
            case "poor":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="container mx-auto max-w-6xl p-4 md:p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline text-primary">
                    Medical Report AI Analysis
                </h1>
                <p className="text-muted-foreground mt-2">
                    Upload your medical test report and get AI-powered insights, analysis, and personalized recommendations.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Upload Medical Report
                    </CardTitle>
                    <CardDescription>
                        Upload a PDF of your medical test report. Our AI will analyze it to provide detailed insights.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="file-upload">Medical Report File</Label>
                            <div
                                className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={handleFileInput}
                                />

                                {!selectedFile ? (
                                    <div className="space-y-4">
                                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <div>
                                            <p className="text-lg font-medium">
                                                Drop your medical report here, or{" "}
                                                <button
                                                    type="button"
                                                    className="text-primary hover:underline"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    browse
                                                </button>
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Supports PDF files up to 5MB
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                        <div>
                                            <p className="text-lg font-medium">{selectedFile.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                        >
                                            Remove File
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading || !selectedFile} className="w-full">
                            {isLoading ? (
                                <>
                                    Analyzing Report...
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Analyze Medical Report
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isLoading && (
                <div className="mt-8 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Our AI is analyzing your medical report...</p>
                </div>
            )}

            {analysis && (
                <div className="mt-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Analysis Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">Overall Health</p>
                                    <p className={`text-2xl font-bold ${getHealthColor(analysis.analysis?.AI_insights?.overallHealth)}`}>
                                        {analysis.analysis?.AI_insights?.overallHealth || 'N/A'}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">Risk Level</p>
                                    <p className={`text-2xl font-bold ${getRiskColor(analysis.analysis?.AI_insights?.risk)}`}>
                                        {analysis.analysis?.AI_insights?.risk || 'N/A'}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">Parameters Analyzed</p>
                                    <p className="text-2xl font-bold text-primary">
                                        {Object.keys(analysis.analysis?.components || {}).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                AI Summary
                            </CardTitle>
                            <CardDescription>
                                AI-generated summary of your medical report
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm leading-relaxed">
                                    {analysis.analysis?.AI_insights?.summary || 'No summary available'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Parameters Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analysis.analysis?.components && Object.entries(analysis.analysis.components).map(([paramName, paramData], index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(paramData.status)}
                                            <div>
                                                <p className="font-medium">{paramName}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Normal range: {paramData.normalRange}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{paramData.value}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(paramData.status)}`}>
                                                {paramData.status?.toUpperCase() || 'UNKNOWN'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    Key Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {analysis.analysis?.AI_insights?.keyInsights?.map((insight, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    )) || (
                                        <li className="text-muted-foreground">No insights available</li>
                                    )}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-blue-500" />
                                    Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {analysis.analysis?.AI_insights?.recommendations?.map((rec, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>{rec}</span>
                                        </li>
                                    )) || (
                                        <li className="text-muted-foreground">No recommendations available</li>
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground text-center">
                                <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice.
                                Always consult with a healthcare provider for proper diagnosis and treatment.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
} 