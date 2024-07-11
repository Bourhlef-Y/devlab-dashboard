// pages/account.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { removeLoggedInCookie } from "@/utils/authCookie";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function Account() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);


  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setMessage("The password must contain at least 8 characters, including a capital letter, a number and a special character.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      removeLoggedInCookie();
      router.push('/login');
      setMessage("Password updated successfully.");
    }
  };

  return (
  <ContentLayout title="Account">  
      <div className="flex flex-col  justify-center  ">
        <Tabs defaultValue="password" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-1 mb-4">
            <TabsTrigger value="password">Change Password of ‎<p>{user?.email || "Loading..."}</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
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
