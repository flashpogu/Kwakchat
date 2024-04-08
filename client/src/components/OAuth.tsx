import { Button } from "@/components/ui/button";
import { app } from "@/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ReactNode } from "react";
interface OAuthProps {
  children: ReactNode;
}
export default function OAuth({ children }: OAuthProps) {
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
          gender: "male",
        }),
      });
      await res.json();
    } catch (error) {
      console.log("could not login with Google", error);
    }
  };
  return (
    <Button onClick={handleGoogle} variant="outline" className="w-full">
      {children}
    </Button>
  );
}
