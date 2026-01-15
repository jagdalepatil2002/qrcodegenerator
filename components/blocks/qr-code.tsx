"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { History, X } from "lucide-react";

const HISTORY_KEY = "qr-generator-history";
const MAX_HISTORY = 15;

function getHistory(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveHistory(history: string[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function QRCodeGenerator() {
    const [text, setText] = useState("Hello World!");
    const [color, setColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [size, setSize] = useState(250);
    const [errorCorrection, setErrorCorrection] = useState("H");
    const [history, setHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const qrRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    // Load history from localStorage on mount
    useEffect(() => {
        setHistory(getHistory());
    }, []);

    // Close history dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
                setShowHistory(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Add to history when text changes (debounced)
    const lastSavedText = useRef("");
    useEffect(() => {
        const timer = setTimeout(() => {
            if (text && text.trim() && text !== lastSavedText.current && text !== "Hello World!") {
                lastSavedText.current = text;
                const currentHistory = getHistory();
                // Remove if already exists (to move to top)
                const filtered = currentHistory.filter(item => item !== text);
                // Add to beginning
                const newHistory = [text, ...filtered].slice(0, MAX_HISTORY);
                saveHistory(newHistory);
                setHistory(newHistory);
            }
        }, 1000); // Save after 1 second of no typing

        return () => clearTimeout(timer);
    }, [text]);

    const selectFromHistory = (item: string) => {
        setText(item);
        setShowHistory(false);
    };

    const clearHistory = () => {
        localStorage.removeItem(HISTORY_KEY);
        setHistory([]);
        setShowHistory(false);
    };

    const downloadSVG = () => {
        const svgElement = qrRef.current?.querySelector("svg");
        if (svgElement) {
            const serializer = new XMLSerializer();
            const svgBlob = new Blob([serializer.serializeToString(svgElement)], {
                type: "image/svg+xml",
            });
            const url = URL.createObjectURL(svgBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "qrcode.svg";
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const downloadPNG = () => {
        const svgElement = qrRef.current?.querySelector("svg");
        if (!svgElement) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "qrcode.png";
            link.click();
        };
        img.src = url;
    };

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardContent className="mt-6">
                    <div className="space-y-4">
                        <div className="relative" ref={historyRef}>
                            <div className="flex gap-2">
                                <Input
                                    id="text"
                                    type="text"
                                    placeholder="Enter any text, URL, phone number, email..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full font-bold text-lg"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setShowHistory(!showHistory)}
                                    className="shrink-0 transition-all duration-200 hover:scale-110"
                                    title="History"
                                >
                                    <History className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* History Dropdown */}
                            {showHistory && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 max-h-64 overflow-hidden animate-in">
                                    <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
                                        <span className="text-sm font-semibold text-muted-foreground">
                                            Recent QR Codes ({history.length})
                                        </span>
                                        {history.length > 0 && (
                                            <button
                                                onClick={clearHistory}
                                                className="text-xs text-destructive hover:underline flex items-center gap-1"
                                            >
                                                <X className="h-3 w-3" />
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                    <div className="overflow-y-auto max-h-48">
                                        {history.length === 0 ? (
                                            <div className="p-4 text-center text-muted-foreground text-sm">
                                                No history yet. Start generating QR codes!
                                            </div>
                                        ) : (
                                            history.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => selectFromHistory(item)}
                                                    className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border/50 last:border-0"
                                                >
                                                    <span className="block truncate text-sm font-medium">
                                                        {item}
                                                    </span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex w-full flex-wrap justify-between gap-4">
                            <div className="relative flex w-full max-w-[40px] items-center gap-3">
                                <label className="text-lg font-bold">
                                    <div
                                        className="size-10 cursor-pointer rounded-full border-2 border-border"
                                        style={{ backgroundColor: color }}
                                    />
                                </label>
                                <Input
                                    className="absolute left-0 top-3 opacity-0"
                                    type="color"
                                    id="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>
                            <div className="relative flex w-full max-w-[40px] items-center gap-3">
                                <label className="text-lg font-bold">
                                    <div
                                        className="size-10 cursor-pointer rounded-full border-2 border-border"
                                        style={{ backgroundColor: backgroundColor }}
                                    />
                                </label>
                                <Input
                                    className="absolute left-0 top-3 opacity-0"
                                    type="color"
                                    id="backgroundColor"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="size">
                                    Size: {size}x{size}
                                </Label>
                                <Slider
                                    id="size"
                                    min={100}
                                    max={800}
                                    step={10}
                                    value={[size]}
                                    onValueChange={(value) => {
                                        if (value[0] !== undefined) {
                                            setSize(value[0]);
                                        }
                                    }}
                                    className="w-60 md:w-80"
                                />
                            </div>
                            <div>
                                <Select
                                    value={errorCorrection}
                                    onValueChange={setErrorCorrection}
                                >
                                    <SelectTrigger id="errorCorrection">
                                        <SelectValue placeholder="Select error correction level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="L">Low (7%)</SelectItem>
                                        <SelectItem value="M">Medium (15%)</SelectItem>
                                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                                        <SelectItem value="H">High (30%)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-4">
                    {text && (
                        <div className="mt-4" ref={qrRef}>
                            <QRCodeSVG
                                value={text}
                                size={size}
                                fgColor={color}
                                bgColor={backgroundColor}
                                level={errorCorrection as "L" | "M" | "Q" | "H"}
                                includeMargin={true}
                            />
                        </div>
                    )}
                    <div className="flex space-x-4">
                        <Button
                            onClick={downloadPNG}
                            className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                        >
                            Download PNG
                        </Button>
                        <Button
                            onClick={downloadSVG}
                            className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                        >
                            Download SVG
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
