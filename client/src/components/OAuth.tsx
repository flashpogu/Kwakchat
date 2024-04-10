import { Button } from "@/components/ui/button";
import { app } from "@/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
interface OAuthProps {
  children: ReactNode;
}
export default function OAuth({ children }: OAuthProps) {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const handleGoogle = async () => {
    setLoading(false);
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
      const data = await res.json();
      if (res.ok) {
        // set data in local storage
        localStorage.setItem("chat-user", JSON.stringify(data));

        // using context
        setAuthUser(data);

        setLoading(false);
        if (res.ok) {
          toast.success("Logged in Successfully!");
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log("could not login with Google", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleGoogle} variant="outline" className="w-full">
      {loading ? (
        <div className="loading loading-spinner text-white"></div>
      ) : (
        children
      )}
    </Button>
  );
}
