import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OAuth from "@/components/OAuth";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface formData {
  [key: string]: string;
}
export default function Login() {
  const [formInput, setFormInput] = useState<formData>({});
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
      });
      const data = await res.json();
      if (res.ok) {
        // set data in local storage
        localStorage.setItem("chat-user", JSON.stringify(data));

        // using context
        setAuthUser(data);

        toast.success("Logged in Successfully!");
        setLoading(false);
      } else {
        toast.error("Something went wrong");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="flex items-center justify-center py-12 h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Kwakchat</h1>
            <p className="text-muted-foreground text-sm">
              Enter your username and password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={handleChange}
                id="username"
                type="username"
                placeholder="kwak"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a className="ml-auto inline-block text-sm underline cursor-pointer">
                  Forgot your password?
                </a>
              </div>
              <Input
                onChange={handleChange}
                id="password"
                type="password"
                required
              />
            </div>
            <Button
              disabled={loading}
              onClick={handleSubmit}
              type="submit"
              className="w-full"
            >
              {loading ? (
                <div className="loading loading-spinner text-white"></div>
              ) : (
                "Login"
              )}
            </Button>
            <OAuth>Login with Google</OAuth>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="cursor-pointer">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/kwakchat.appspot.com/o/wallpaperflare.comd_wallpaper.jpg?alt=media&token=ad992c21-d358-45aa-bbe6-80549676a32d"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
