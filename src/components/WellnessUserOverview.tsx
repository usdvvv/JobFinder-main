import React, { useEffect, useState } from "react";
import { HeartPulse, Smile, SmilePlus, Thermometer, Bed, Info } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Watch, BluetoothSearching, Activity } from "lucide-react";

function getMockWellnessData() {
  const stress = Math.floor(Math.random() * 42) + 35; // 35-77%
  const hrv = Math.floor(Math.random() * 45) + 50; // 50-95 ms
  const sleep = Math.floor(Math.random() * 3) + 6; // 6-8 hrs
  let mood = "Good";
  if (stress > 65) mood = "Bad"; 
  else if (stress > 50) mood = "Neutral";
  let recs = ["Go for a short walk", "Practice deep breathing", "Take a short break"];
  if (mood === "Bad") recs = ["Try a mindfulness exercise", "Drink some water and step away for 5 min", "Talk to a friend or mentor"];
  else if (mood === "Neutral") recs = ["Take a short stretching break", "Do a breathing exercise"];
  else recs = ["Great work! Keep up your healthy routine", "Remember to celebrate small wins"];
  return { stress, mood, hrv, sleep, recs };
}

const moodMap = {
  Good: { label: "Good Mood", icon: <SmilePlus className="text-green-400 h-5 w-5" /> },
  Neutral: { label: "Neutral Mood", icon: <Smile className="text-yellow-500 h-5 w-5" /> },
  Bad: { label: "Bad Mood", icon: <HeartPulse className="text-red-500 h-5 w-5" /> },
};

type Props = {
  hideTitle?: boolean;
  hideCard?: boolean;
  forceConnected?: boolean;
};

export default function WellnessUserOverview({ hideTitle, hideCard, forceConnected }: Props) {
  const [stats, setStats] = useState(getMockWellnessData());
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (forceConnected) {
      setConnected(true);
      return;
    }
    if (connected) {
      // Fake a new "live" update every 8 seconds
      const i = setInterval(() => setStats(getMockWellnessData()), 8000);
      return () => clearInterval(i);
    }
  }, [connected, forceConnected]);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1800);
  };

  const content = (
    <CardContent>
      {(connected || forceConnected) ? (
        <div className="flex flex-wrap gap-8 items-center justify-between pt-3">
          <div>
            <div className="text-xs text-gray-300">Stress Percentage</div>
            <div className="font-bold text-2xl text-white flex items-center gap-2">
              {stats.stress}% <Thermometer className="h-4 w-4 text-blue-300" />
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-300">Mood</div>
            <div className="flex items-center text-white font-medium gap-2">
              {moodMap[stats.mood].icon}
              {moodMap[stats.mood].label}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-300">HRV</div>
            <div className="text-white font-semibold flex items-center gap-1">{stats.hrv} ms <Info className="h-3 w-3 text-blue-200" /></div>
            <div className="text-[0.70rem] text-gray-400">Heart rate variability</div>
          </div>
          <div>
            <div className="text-xs text-gray-300">Sleep Last Night</div>
            <div className="text-white font-semibold flex items-center gap-1">{stats.sleep} hrs <Bed className="h-4 w-4 text-blue-400" /></div>
          </div>
          <div className="min-w-[180px]">
            <div className="text-xs text-gray-300 mb-1">Recommendations</div>
            <ul className="list-disc pl-5 text-white/90 text-sm space-y-1">
              {stats.recs.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-8 pb-6 text-center text-gray-300 min-h-[160px]">
          <Watch className="h-10 w-10 mx-auto mb-3 animate-bounce text-blue-300" />
          <div className="text-lg font-medium mb-1">Connect your smartwatch</div>
          <div className="text-sm mb-2 max-w-xs">
            Pair your smartwatch to view your live health and wellness data here!
          </div>
          {!hideCard && !connecting && (
            <Button
              variant="default"
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 px-4 py-1"
              onClick={handleConnect}
              size="sm"
            >
              <Watch className="mr-2 h-4 w-4" />
              Connect Smartwatch
            </Button>
          )}
        </div>
      )}
    </CardContent>
  );

  if (hideCard) {
    return (
      <div>
        {!hideTitle && (
          <div className="flex items-center gap-3 mb-3">
            <HeartPulse className="h-5 w-5 text-red-400" />
            <span className="font-semibold text-lg text-white">Your Wellness Overview</span>
          </div>
        )}
        <div className="pt-0">{content.props.children}</div>
      </div>
    );
  }

  return (
    <Card className="mb-8 bg-gradient-to-br from-purple-900/70 to-blue-950/80 backdrop-blur-lg border border-white/10 shadow-lg">
      {!hideTitle && (
        <CardHeader>
          <div className="flex items-center gap-3">
            <HeartPulse className="h-5 w-5 text-red-400" />
            <span className="font-semibold text-lg text-white">Your Wellness Overview</span>
          </div>
        </CardHeader>
      )}
      {content}
    </Card>
  );
}
