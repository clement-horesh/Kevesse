"use client";
import React from "react";
import { ContainerScroll } from "./ContainerScroll";

export function HeroScrollDemo() {
  return (
    <div className="flex mt-[-350px] md:mt-[-250px] lg:mt-[-300px] flex-col overflow-hidden">
      <ContainerScroll
        users={users}
        titleComponent={""
        }
      />
    </div>
  );
}

export const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
  // ... other user objects
  {
    name: "Margaret Hall",
    designation: "Quality Assurance, BugFree",
    image: "https://picsum.photos/id/29/300/300",
    badge: "Developer",
  },
];
