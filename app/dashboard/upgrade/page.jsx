"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function UpgradePlanPage() {
  return (
      <main className="flex items-center justify-center bg-gray-100 p-8">
          
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
      
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg border hover:border-blue-500 transition-all duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
          <p className="text-gray-600 mb-4">₹0 / month</p>
          <ul className="text-gray-700 mb-6 list-disc pl-5">
            <li>10 Course Generate</li>
            <li>Limited Support</li>
            <li>Quiz and Notes Features</li>
          </ul>
          <Button variant="outline" className="w-full rounded-2xl  bg-blue-700 hover:bg-blue-600">Current Plan</Button>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg border hover:border-blue-500 transition-all duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
          <p className="text-gray-600 mb-4">₹999 / month</p>
          <ul className="text-gray-700 mb-6 list-disc pl-5">
            <li>Unlimited Course Generate</li>
            <li>Email Supportt</li>
            <li>Help Center Acess</li>
          </ul>
          <Button className="w-full rounded-2xl bg-blue-700 hover:bg-blue-600">Get Started</Button>
        </div>

      </div>
    </main>
  );
}
