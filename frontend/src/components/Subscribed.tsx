import React from 'react';
import { MdVerified } from "react-icons/md";

export default function Subscribed() {
  return (
    <div className="flex items-center text-purple-600">
      <MdVerified className="mr-2" />
      <span className="font-semibold">Verified Artist</span>
    </div>
  );
}