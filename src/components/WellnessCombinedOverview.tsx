
import React, { useState } from "react";
import WellnessCompanyOverview from "@/components/WellnessCompanyOverview";
import WellnessUserOverview from "@/components/WellnessUserOverview";
import { HeartPulse, Building2, Watch } from "lucide-react";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Renders the company and user wellness together in a single card, with a single connection control
export default function WellnessCombinedOverview() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1800);
  };

  return (
    <Card className="mb-8 bg-gradient-to-br from-purple-800/70 to-blue-950/80 backdrop-blur-lg border border-white/10 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <HeartPulse className="h-5 w-5 text-red-400" />
          <span className="font-semibold text-lg text-white">
            Company & Your Wellness Overview
          </span>
        </div>
        <CardDescription className="mt-1 text-gray-300">
          Live well-being metrics for your organization and for you personally!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!connected ? (
          <div className="flex flex-col items-center justify-center pt-8 pb-6 text-center text-gray-300 min-h-[200px]">
            <Watch className="h-10 w-10 mx-auto mb-3 animate-bounce text-blue-300" />
            <div className="text-lg font-medium mb-1">Connect your smart device</div>
            <div className="text-sm mb-2 max-w-xs">
              Pair your smartwatch to view live company and personal wellness data here!
            </div>
            <Button
              variant="default"
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 px-4 py-1"
              onClick={handleConnect}
              size="sm"
              disabled={connecting}
            >
              <Watch className="mr-2 h-4 w-4" />
              {connecting ? "Connecting..." : "Connect Smartwatch"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1">
              <div className="mb-3 text-base font-semibold text-blue-300 flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Company Wellness Snapshot
              </div>
              {/* Render only metrics/content, not the enclosing card, for company */}
              <div className="bg-transparent p-0">
                <WellnessCompanyOverview hideTitle hideCard forceConnected />
              </div>
            </div>
            {/* Vertical divider for desktop, horizontal for mobile */}
            <div className="my-6 md:my-0 md:mx-6 flex justify-center items-center">
              <div className="w-full h-px md:w-px md:h-40 bg-blue-900/70" />
            </div>
            <div className="flex-1">
              <div className="mb-3 text-base font-semibold text-purple-300 flex items-center gap-2">
                <HeartPulse className="h-4 w-4" /> Your Wellness Stats
              </div>
              {/* Render only metrics/content, not the enclosing card, for user */}
              <div className="bg-transparent p-0">
                <WellnessUserOverview hideTitle hideCard forceConnected />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
