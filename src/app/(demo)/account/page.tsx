// pages/account.tsx
"use client";

import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
import { removeLoggedInCookie } from "@/utils/authCookie"; // Import function to remove logged-in cookie
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Button } from "@/components/ui/button"; // Import Button component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { Input } from "@/components/ui/input"; // Import Input component
import { Label } from "@/components/ui/label"; // Import Label component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { ContentLayout } from "@/components/layout/content-layout"; // Import ContentLayout component
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase

export default function Account() {
  const [password, setPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming new password
  const [message, setMessage] = useState(""); // State for error/success message
  const router = useRouter(); // Initialize useRouter for navigation
  const [user, setUser] = useState<User | null>(null); // State for user, initialized as null

  // Effect to get the user data when the component mounts
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // Get user data from Supabase
      setUser(user); // Set user state
    };
    getUser();
  }, []);

  // Function to handle password change
  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match"); // Set error message if passwords don't match
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setMessage("The password must contain at least 8 characters, including a capital letter, a number and a special character.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password }); // Update user password
    if (error) {
      setMessage(`Error: ${error.message}`); // Set error message if update fails
    } else {
      removeLoggedInCookie(); // Remove logged-in cookie
      router.push('/login'); // Redirect to login page
      setMessage("Password updated successfully."); // Set success message
    }
  };

  return (
  <ContentLayout title="Account">  
    <div className="flex flex-col justify-center">
      <Tabs defaultValue="password" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-1 mb-4">
          <TabsTrigger value="password">
            Change Password of ‎<p>{user?.email || "Loading..."}</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. You will be logged out 
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="space-y-1">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleChangePassword}>Save password</Button>
            </CardFooter>
            {message && <p className="mt-2 text-red-600">{message}</p>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </ContentLayout>
  );
}
