import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Removed: import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Removed: import { FcGoogle } from "react-icons/fc";
// Removed: import axios from "axios";

export const Navbar = () => {
  // Removed: No need to check for user authentication now.
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <img src="/mainlogo.png" className="w-28 md:w-40" />
      </Link>
      <div className="flex justify-center items-center gap-1 md:gap-3">
        <Link to={"/create-trip"}>
          <Button variant="outline" className="rounded-full">
            Create Trips
          </Button>
        </Link>
        <Link to={"/my-trips"}>
          <Button variant="outline" className="rounded-full">
            My Trips
          </Button>
        </Link>
      </div>
    </div>
  );
};
