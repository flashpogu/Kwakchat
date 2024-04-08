import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import OAuth from "@/components/OAuth";

export default function Signup() {
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
                id="fullname"
                type="fullname"
                placeholder="Enter your Full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
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
