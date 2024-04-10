import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import OAuth from "@/components/OAuth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

interface formData {
  [key: string]: string;
}

export default function Signup() {
  const [formInput, setFormInput] = useState<formData>({});
  const [selectionGender, setSelectionGender] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formInput, gender: selectionGender }),
      });
      const data = await res.json();
      if (res.ok) {
        // set data in local storage
        localStorage.setItem("chat-user", JSON.stringify(data));

        // using context
        setAuthUser(data);

        toast.success("New User Created Successfully!");
        setLoading(false);
      } else {
        toast.error("Something went wrong");
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/kwakchat.appspot.com/o/wallpaperflare.com_wallpaper%20(1).jpg?alt=media&token=893f4f24-27fc-4a02-a91a-97eb159a83a6")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-3/4 md:w-1/2 xl:w-1/4">
        <CardHeader>
          <CardTitle className="text-xl">Join Us</CardTitle>
          <CardDescription>Enter your details to join Kwakchat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                onChange={handleChange}
                id="fullName"
                type="fullname"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                onChange={handleChange}
                id="username"
                type="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="Atleast 6 character"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                onChange={handleChange}
                id="confirmPassword"
                type="password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(e) => setSelectionGender(e)} required>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="choose your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              {loading ? (
                <div className="loading loading-spinner text-white"></div>
              ) : (
                "Create an account"
              )}
            </Button>
            <OAuth>Sign up Google</OAuth>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
